import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const base = new URL(process.argv[2] || 'http://127.0.0.1:3000');
const streamUrl = new URL('/stream', base);

async function observeStream() {
  const id = randomUUID();
  const started = performance.now();
  const response = await fetch(streamUrl, {
    headers: { 'x-demo-request-id': id },
    signal: AbortSignal.timeout(30000),
  });
  if (response.status !== 200) {
    const type = response.headers.get('lambda-web-error-type');
    throw new Error(`HTTP ${response.status} ${type || '(no AWS error header)'}`);
  }
  assert.match(response.headers.get('content-type') || '', /^text\/event-stream\b/i);

  const events = [];
  let buffer = '';
  for await (const chunk of response.body.pipeThrough(new TextDecoderStream())) {
    const arrivedMs = Math.round(performance.now() - started);
    buffer += chunk;
    let boundary;
    while ((boundary = buffer.indexOf('\n\n')) !== -1) {
      const lines = buffer.slice(0, boundary).split('\n');
      buffer = buffer.slice(boundary + 2);
      const name = lines.find(line => line.startsWith('event: '))?.slice(7);
      const data = JSON.parse(lines.find(line => line.startsWith('data: '))?.slice(6));
      assert.equal(data.requestId, id);
      events.push({ name, data, arrivedMs });
    }
  }
  assert.equal(buffer, '');
  assert.deepEqual(events.map(e => e.name), ['ready', 'tick', 'tick', 'tick', 'tick', 'done']);
  assert.deepEqual(events.slice(1, 5).map(e => e.data.tick), [1, 2, 3, 4]);
  const { instanceId, inFlightAtStart } = events[0].data;
  assert.ok(instanceId && Number.isInteger(inFlightAtStart) && inFlightAtStart > 0);
  return { instanceId, inFlightAtStart, eventArrivalMs: events.map(e => e.arrivedMs) };
}

// The first observation is not proof of a cold start.
const single = await observeStream();
const outcomes = await Promise.allSettled(Array.from({ length: 12 }, observeStream));
const batch = outcomes.filter(r => r.status === 'fulfilled').map(r => r.value);
const errors = outcomes.filter(r => r.status === 'rejected').map(r => r.reason.message);
const byProcess = new Map();
for (const row of batch) {
  const stats = byProcess.get(row.instanceId) || { requests: 0, maxInFlight: 0 };
  stats.requests += 1;
  stats.maxInFlight = Math.max(stats.maxInFlight, row.inFlightAtStart);
  byProcess.set(row.instanceId, stats);
}
console.log(JSON.stringify({ single, batch, errors, byProcess: Object.fromEntries(byProcess) }, null, 2));
if (errors.length) process.exitCode = 1;

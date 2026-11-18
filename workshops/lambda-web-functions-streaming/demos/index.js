const http = require('node:http');
const { randomUUID } = require('node:crypto');
const { setTimeout: delay } = require('node:timers/promises');

const instanceId = randomUUID();
let inFlight = 0;
const [host, port] = (
  process.env.AWS_LAMBDA_HTTP_ENDPOINT || '127.0.0.1:3000'
).split(':');

const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (req.method !== 'GET') {
    res.writeHead(405, { Allow: 'GET' }).end();
    return;
  }
  if (path === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, instanceId }));
    return;
  }
  if (path !== '/stream') {
    res.writeHead(404).end();
    return;
  }

  const requestId = String(req.headers['x-demo-request-id'] || randomUUID());
  const cancellation = new AbortController();
  res.once('close', () => cancellation.abort());
  inFlight += 1;
  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };
  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    });
    res.flushHeaders();
    send('ready', { instanceId, requestId, inFlightAtStart: inFlight });
    for (let tick = 1; tick <= 4; tick += 1) {
      await delay(250, undefined, { signal: cancellation.signal });
      send('tick', { requestId, tick });
    }
    send('done', { requestId });
  } catch (error) {
    if (!cancellation.signal.aborted) {
      console.error(error);
      res.destroy(error);
    }
  } finally {
    inFlight -= 1;
    if (!res.destroyed) res.end();
  }
});

server.listen(Number(port), host, () => console.log('Server listening'));

'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { buildDist, withoutNotebookLinks } = require('./build-dist.cjs');

const colabURL = 'https://colab.research.google.com/github/example/workshop/blob/main/lab.ipynb';
const githubURL = 'https://github.com/example/workshop/blob/main/lab.ipynb';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'presentation-dist-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const folder of ['slides', 'assets', 'demos']) fs.mkdirSync(path.join(root, folder));
  const image = Buffer.from('one image, referenced by three names');
  for (const name of ['first.png', 'same.png', 'runtime.png']) fs.writeFileSync(path.join(root, 'assets', name), image);
  fs.writeFileSync(path.join(root, 'assets', 'colab-qr.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>');
  const slides = `window.WORKSHOP=${JSON.stringify({ id: 'test', guideIntro: 'Local preparation only', slides: [{ title: 'A test', notes: 'Keep the presenter notes.', body: `<img src="../assets/first.png"><div class="notebook-links"><a href="../demos/lab.ipynb" download>Notebook</a><a href="../exports/workshop-notebooks.zip" download>Bundle</a><a class="colab-qr" href="${colabURL}"><img src="../assets/colab-qr.svg" alt="Open in Colab">Open in Colab</a><a href="${githubURL}">View notebook source</a></div><a href="https://example.com/research">Research</a>`, sources: [{ url: '../demos/lab.ipynb', label: 'Notebook' }, { url: colabURL, label: 'Colab' }, { url: githubURL, label: 'GitHub notebook' }, { url: 'https://example.com/paper', label: 'Paper' }] }] })};`;
  fs.writeFileSync(path.join(root, 'slides', 'slides.js'), slides);
  fs.writeFileSync(path.join(root, 'slides', 'style.css'), "body { background: url('../assets/same.png'); }");
  fs.writeFileSync(path.join(root, 'demos', 'runtime.js'), "window.Demo={image:'../assets/runtime.png'};");
  fs.writeFileSync(path.join(root, 'slides', 'index.html'), '<!doctype html><html><head><link rel="stylesheet" href="style.css"></head><body><script src="slides.js"></script><script src="../demos/runtime.js"></script></body></html>');
  return { root, input: path.join(root, 'slides', 'index.html'), output: path.join(root, 'dist'), slides };
}

test('deduplicates media, keeps external notebook launches and QR cards, and removes local downloads', t => {
  const config = fixture(t);
  const result = buildDist(config);
  const manifest = JSON.parse(fs.readFileSync(path.join(config.output, 'manifest.json')));
  assert.equal(result.slides, 1);
  assert.equal(fs.readdirSync(path.join(config.output, 'assets')).length, 2);
  assert.equal(result.files, 6); // HTML, CSS, runtime, image, QR SVG, manifest.
  const js = fs.readFileSync(path.join(config.output, manifest.files.find(file => file.path.endsWith('.js')).path), 'utf8');
  assert.match(js, /Keep the presenter notes/);
  assert.match(js, /example\.com\/research/);
  assert.match(js, /example\.com\/paper/);
  assert.ok(js.includes(colabURL));
  assert.ok(js.includes(githubURL));
  assert.match(js, /Open in Colab/);
  assert.match(js, /assets\/[a-f0-9]{20}\.svg/);
  assert.match(js, /notebook-links/);
  assert.doesNotMatch(js, /\.\.\/demos\/lab\.ipynb|workshop-notebooks\.zip|Local preparation|\.\.\/assets/);
  assert.equal(manifest.files.filter(file => /\.(?:ipynb|zip)$/.test(file.path)).length, 0);
  assert.equal(fs.readFileSync(path.join(config.root, 'slides', 'slides.js'), 'utf8'), config.slides);
  assert.deepEqual(fs.readdirSync(config.output).sort(), ['assets', 'index.html', 'manifest.json', ...manifest.files.filter(file => /\.(?:css|js)$/.test(file.path)).map(file => file.path)].sort());
});

test('removes empty local-download wrappers without removing surrounding content', () => {
  const input = '<p>Keep this</p><div class="notebook-links"><a href="../demos/lab.ipynb?download=1"><span>Download</span></a> <a href="./labs.zip">Bundle</a></div>';
  assert.equal(withoutNotebookLinks(input), '<p>Keep this</p>');
  const external = `<div class="notebook-links"><a href="${colabURL}">Open in Colab</a></div>`;
  assert.equal(withoutNotebookLinks(external), external);
});

test('is deterministic and refuses to erase unrelated files on rebuild', t => {
  const config = fixture(t);
  buildDist(config);
  const before = fs.readFileSync(path.join(config.output, 'manifest.json'), 'utf8');
  buildDist(config);
  assert.equal(fs.readFileSync(path.join(config.output, 'manifest.json'), 'utf8'), before);
  fs.writeFileSync(path.join(config.output, 'keep.txt'), 'do not erase');
  assert.throws(() => buildDist(config), /not generated/);
  assert.equal(fs.readFileSync(path.join(config.output, 'keep.txt'), 'utf8'), 'do not erase');
});

test('rejects missing media and oversized files before replacing an existing dist', t => {
  const config = fixture(t);
  buildDist(config);
  const before = fs.readFileSync(path.join(config.output, 'manifest.json'), 'utf8');
  assert.throws(() => buildDist({ ...config, maxFileBytes: 10 }), /host file limit/);
  fs.unlinkSync(path.join(config.root, 'assets', 'runtime.png'));
  assert.throws(() => buildDist(config), /ENOENT/);
  assert.equal(fs.readFileSync(path.join(config.output, 'manifest.json'), 'utf8'), before);
});

test('refuses an output directory that contains the authoring deck', t => {
  const config = fixture(t);
  assert.throws(() => buildDist({ ...config, output: config.root }), /must not contain/);
  assert.ok(fs.existsSync(config.input));
});

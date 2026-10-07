'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { test } = require('node:test');

test('portable build embeds SVG QR assets with the SVG MIME type and preserves raster embedding', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'portable-presentation-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const directory of ['slides', 'assets']) fs.mkdirSync(path.join(root, directory));
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>';
  const raster = Buffer.from('test JPEG asset');
  fs.writeFileSync(path.join(root, 'assets', 'colab-qr.svg'), svg);
  fs.writeFileSync(path.join(root, 'assets', 'photo.jpg'), raster);
  fs.writeFileSync(path.join(root, 'slides', 'slides.js'), `window.WORKSHOP=${JSON.stringify({ title: 'Test', slides: [{ title: 'Open in Colab', body: '<a href="https://colab.research.google.com/github/example/workshop/blob/main/lab.ipynb"><img src="../assets/colab-qr.svg"></a><img src="../assets/photo.jpg">', notes: 'Present this.' }], sources: {} })};`);
  fs.writeFileSync(path.join(root, 'slides', 'style.css'), "body{background-image:url('../assets/colab-qr.svg')}");
  fs.writeFileSync(path.join(root, 'slides', 'index.html'), '<!doctype html><link rel="stylesheet" href="style.css"><script src="slides.js"></script>');
  const output = path.join(root, 'exports', 'deck.html');
  execFileSync(process.execPath, [path.join(__dirname, 'build.cjs'), path.join(root, 'slides', 'index.html'), output]);
  const html = fs.readFileSync(output, 'utf8');
  assert.ok(html.includes(`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`));
  assert.ok(html.includes(`data:image/jpeg;base64,${raster.toString('base64')}`));
  assert.match(html, /https:\/\/colab\.research\.google\.com\/github\/example\/workshop\/blob\/main\/lab\.ipynb/);
  assert.doesNotMatch(html, /\.\.\/assets\//);
});

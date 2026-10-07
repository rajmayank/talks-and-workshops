/* Build the files a static host needs, without copying the authoring tree. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');

const FORMAT = 'presentation-dist-v1';
const MAX_FILE_BYTES = 25 * 1024 * 1024;
const digest = data => crypto.createHash('sha256').update(data).digest('hex');
const localNotebookURL = value => !/^(?:https?:)?\/\//i.test(value) && /\.(?:ipynb|zip)(?:[?#]|$)/i.test(value);

function withoutNotebookLinks(html) {
  // Colab/GitHub launches and QR cards stay; notebook files live in the source repo.
  html = html.replace(/<a\b([^>]*\bhref=["']([^"']+)["'][^>]*)>[\s\S]*?<\/a>/gi,
    (anchor, attributes, href) => localNotebookURL(href) ? '' : anchor);
  return html.replace(/<div\b[^>]*class=["'][^"']*\bnotebook-links\b[^"']*["'][^>]*>\s*<\/div>/gi, '');
}

function prepareDeck(value) {
  if (Array.isArray(value)) return value.filter(item => !(item?.url && localNotebookURL(item.url))).map(prepareDeck);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value)
    .filter(([key, item]) => key !== 'guideIntro' && !(item?.url && localNotebookURL(item.url)))
    .map(([key, item]) => [key, prepareDeck(item)]));
  return typeof value === 'string' ? withoutNotebookLinks(value) : value;
}

function buildDist({ input = 'workshops/ai-watermarking/slides/index.html', output = 'workshops/ai-watermarking/dist', maxFileBytes = MAX_FILE_BYTES } = {}) {
  input = path.resolve(input);
  output = path.resolve(output);
  const base = path.dirname(input);
  if (input === output || input.startsWith(output + path.sep)) throw new Error('Output must not contain the source deck.');
  const media = new Map();
  const files = new Map();
  const add = (name, data) => {
    const bytes = Buffer.isBuffer(data) ? data : Buffer.from(data);
    if (bytes.length > maxFileBytes) throw new Error(`${name} exceeds the ${maxFileBytes}-byte host file limit.`);
    files.set(name, bytes);
    return name;
  };
  const rewriteAssets = (text, referenceBase = base) => text.replace(
    /(?:\.\.?\/)+assets\/[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|gif|svg|avif|woff2?|mp4|webm|mp3|ogg)/gi,
    relative => {
      const absolute = path.resolve(referenceBase, relative);
      const data = fs.readFileSync(absolute);
      const hash = digest(data);
      if (!media.has(hash)) media.set(hash, add(`assets/${hash.slice(0, 20)}${path.extname(absolute).toLowerCase()}`, data));
      return media.get(hash);
    });
  let html = fs.readFileSync(input, 'utf8');
  const styles = [];
  const scripts = [];
  let slideCount = 0;
  let foundDeck = false;
  let styleInserted = false;
  let scriptInserted = false;
  html = html.replace(/<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/gi, (tag, relative) => {
    if (/^(?:https?:)?\/\//i.test(relative)) return tag;
    const source = path.resolve(base, relative);
    styles.push(rewriteAssets(fs.readFileSync(source, 'utf8'), path.dirname(source)));
    if (styleInserted) return '';
    styleInserted = true;
    return '<!-- PRESENTATION_STYLE -->';
  });
  html = html.replace(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/script>/gi, (tag, relative) => {
    if (/^(?:https?:)?\/\//i.test(relative)) return tag;
    let source = fs.readFileSync(path.resolve(base, relative), 'utf8');
    if (/window\.WORKSHOP\s*=/.test(source)) {
      if (foundDeck) throw new Error('The input contains multiple workshop manifests.');
      const context = { window: {} };
      vm.runInNewContext(source, context, { timeout: 1000 });
      const deck = prepareDeck(context.window.WORKSHOP);
      if (!Array.isArray(deck?.slides)) throw new Error('The workshop manifest has no slides.');
      foundDeck = true;
      slideCount = deck.slides.length;
      source = `window.WORKSHOP=${JSON.stringify(deck)};`;
    }
    // Runtime image references resolve against the document, as in the authoring deck.
    scripts.push(rewriteAssets(source));
    if (scriptInserted) return '';
    scriptInserted = true;
    return '<!-- PRESENTATION_SCRIPT -->';
  });
  if (!foundDeck || !scripts.length || !styles.length) throw new Error('Expected a WORKSHOP manifest, local scripts and local styles.');
  const css = styles.join('\n');
  const js = `'use strict';\n${scripts.join('\n;\n').trimEnd()}\n`;
  new vm.Script(js, { filename: 'presentation bundle' });
  const cssName = add(`presentation.${digest(css).slice(0, 12)}.css`, css);
  const jsName = add(`presentation.${digest(js).slice(0, 12)}.js`, js);
  html = withoutNotebookLinks(rewriteAssets(html))
    .replace('<!-- PRESENTATION_STYLE -->', `<link rel="stylesheet" href="${cssName}">`)
    .replace('<!-- PRESENTATION_SCRIPT -->', `<script src="${jsName}"></script>`);
  add('index.html', html.replace(/[\t ]+$/gm, '').trimEnd() + '\n');
  // Assets referenced in strings inside the runtime need the same check as HTML/CSS.
  for (const [name, data] of files) {
    if (!/\.(?:html|css|js)$/.test(name)) continue;
    const text = data.toString();
    if (/\.\.\/assets\//.test(text)) throw new Error(`Unresolved source asset in ${name}.`);
    for (const match of text.matchAll(/href=\\?["']([^"']+)/gi)) {
      if (localNotebookURL(match[1].replace(/\\$/, ''))) throw new Error(`Local notebook download link remains in ${name}.`);
    }
    for (const asset of text.match(/assets\/[a-f0-9]{20}\.[a-z0-9]+/g) || []) {
      if (!files.has(asset)) throw new Error(`Missing output asset ${asset} referenced by ${name}.`);
    }
  }
  const manifest = { format: FORMAT, entry: 'index.html', slides: slideCount, files: [...files].map(([name, data]) => ({ path: name, bytes: data.length, sha256: digest(data) })).sort((a, b) => a.path.localeCompare(b.path)) };
  add('manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  // Do not accidentally erase a source directory or an unrelated output folder.
  if (fs.existsSync(output)) {
    const oldManifest = path.join(output, 'manifest.json');
    if (!fs.existsSync(oldManifest)) throw new Error('Existing output is not a presentation dist. Choose an empty output directory.');
    const previous = JSON.parse(fs.readFileSync(oldManifest, 'utf8'));
    if (previous.format !== FORMAT) throw new Error('Existing output has an unrecognised manifest.');
    const allowed = new Set(['manifest.json', ...previous.files.map(file => file.path)]);
    const walk = (directory, prefix = '') => fs.readdirSync(directory, { withFileTypes: true }).flatMap(item => {
      const name = prefix + item.name;
      return item.isDirectory() ? walk(path.join(directory, item.name), name + '/') : [name];
    });
    if (walk(output).some(name => !allowed.has(name))) throw new Error('Output contains files not generated by the previous build. Move them before rebuilding.');
  }
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const staging = fs.mkdtempSync(path.join(path.dirname(output), '.presentation-dist-'));
  try {
    for (const [name, data] of files) {
      const target = path.join(staging, name);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, data);
    }
    if (fs.existsSync(output)) fs.rmSync(output, { recursive: true });
    fs.renameSync(staging, output);
  } catch (error) {
    fs.rmSync(staging, { recursive: true, force: true });
    throw error;
  }
  return { output, slides: slideCount, files: files.size, bytes: [...files.values()].reduce((sum, data) => sum + data.length, 0), largestFile: Math.max(...[...files.values()].map(data => data.length)) };
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const options = {};
    while (args.length) {
      const option = args.shift();
      if (!['--input', '--output'].includes(option) || !args.length) throw new Error('Usage: node shared/presentation/build-dist.cjs [--input path/to/slides/index.html] [--output path/to/dist]');
      options[option.slice(2)] = args.shift();
    }
    console.log(JSON.stringify(buildDist(options), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { buildDist, withoutNotebookLinks };

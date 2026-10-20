import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let html = await readFile(path.join(project, 'dist/index.html'), 'utf8');
const script = html.match(/<script[^>]*src="([^"]+)"[^>]*><\/script>/);
const stylesheet = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (!script || !stylesheet) throw new Error('Build the app before creating the standalone file.');
const code = await readFile(path.join(project, 'dist', script[1].replace(/^\//, '')), 'utf8');
const css = await readFile(path.join(project, 'dist', stylesheet[1].replace(/^\//, '')), 'utf8');
html = html.replace(script[0], () => `<script type="module">${code.replace(/<\/script/gi, '<\\/script')}</script>`);
html = html.replace(stylesheet[0], () => `<style>${css}</style>`);
if (/(?:src|href)="\/assets\//.test(html)) throw new Error('An app asset was not inlined.');
// Keep the old filename updated so existing file bookmarks and browser data work.
for (const name of ['Hartlink.html', 'Closeby.html']) {
  const output = path.join(project, '..', name);
  await writeFile(output, html, 'utf8');
  console.log(`Updated ${output}`);
}

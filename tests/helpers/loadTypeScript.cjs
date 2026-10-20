const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const modules = new Map();

// Compile local source modules in memory, without touching browser data.
function loadTypeScript(filename) {
  if (modules.has(filename)) return modules.get(filename).exports;
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const module = { exports: {} };
  modules.set(filename, module);
  const localRequire = (name) => {
    if (!name.startsWith('.')) return require(name);
    const base = path.resolve(path.dirname(filename), name);
    const target = [base + '.ts', base + '.tsx', path.join(base, 'index.ts')].find(fs.existsSync);
    if (!target) throw new Error('Source module not found: ' + name);
    return loadTypeScript(target);
  };
  new Function('require', 'module', 'exports', code)(localRequire, module, module.exports);
  return module.exports;
}
module.exports = { loadTypeScript };

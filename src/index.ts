import { Program } from 'estree';
import { PluginContext, Plugin, OutputBundle, RenderedChunk, OutputOptions } from 'rollup';

const path = require('path');
function myPlugin() {
  const paths: string[] = [];

  const transformImport = (ast: Program, filePath: string, context: PluginContext) => {
    for (const item of ast.body) {
      if (item.type === 'ImportDeclaration') {
        const resolve = context.resolveId(item.source.value as string, filePath);
        if (resolve instanceof Promise) {
          resolve.then((moduleId) => {
            if (moduleId) {
              context.getModuleInfo(moduleId as string);
            }
          })
        } else {
          console.log(resolve);
        }
      }
    }
  };

  const resolveReturn: Plugin = {
    name: 'rollup-web-workify-plugin',
    resolveId(importee: string, importer: string) {
      if (/.*worker.*\!([^!]+)/.test(importee)) {
        const fileName = importee.replace(/.*worker.*\!([^!]+)/, '$1');
        const filePath = path.resolve(path.dirname(importer), fileName);
        paths.push(filePath);
        return filePath;
      }
    },
    transform(code: string, id: string) {
      if (!paths.includes(id)) {
        return;
      }
      return new Promise((resolve, reject) => {
        const newCode = transformImport(this.parse(code, null), id, this);
        return code;
      });
    },
  };

  return resolveReturn;
}

module.exports = myPlugin;

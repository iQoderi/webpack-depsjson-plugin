'use strict';

const fs = require('fs');

class DepsWebpackPlugin {
  constructor(options) {
    this.options = options;
    this.currentPath = process.cwd();
  };

  apply(compiler) {
    compiler.plugin('done', (stats) => {
      const pkg = require(`${this.currentPath}/package.json`);
      const pkgDeps = pkg.dependencies;
      const keys = Object.keys(pkgDeps);
      const nodeModules = `${this.currentPath}/node_modules`;
      const result = {};

      keys.forEach((name) => {
        const modulePkg = require(`${nodeModules}/${name}/package.json`);
        const version = modulePkg.version;

        result[name] = version;
      });

      const compilation = stats.compilation;
      const outputOptions = compilation.outputOptions;
      const outputPath = outputOptions.path;

      fs.writeFile(`${outputPath}/deps.json`, JSON.stringify(result, null, 4), null, (err) => {
        if (err) {
          // todo
          console.log(err);          
        }
      });
    });

    compiler.plugin('failed', (err) => {
      console.error(err);
    })
  }
};

module.exports = DepsWebpackPlugin;

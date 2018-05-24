'use strict';

class DepsPlugin {
  constructor(options) {
    this.options = options;
  };

  apply(compiler) {
    compiler.plugin('done', function(stats) {
      console.log(stats);
    });

    compiler.plugin('failed', function(err) {

    })
  }
};

module.exports = DepsPlugin;

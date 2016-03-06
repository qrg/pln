'use strict';

const bs = require('browser-sync').create();

module.exports = () => {
  bs.init({
    server: {baseDir: './public'},
    startPath: `/${project}/jp/index.html`,
    browser: ['google chrome', 'firefox', 'safari']
  });
};

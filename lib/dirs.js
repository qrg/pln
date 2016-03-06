'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const ASSETS_DIR = 'assets';
const TOP_DIRS_MAP = {
  src: 'src',
  dist: 'public'
}; // ROOT 直下にあるディレクトリ

const joint = (topDir) => {
  return (...paths) => {
    return path.join(ROOT_DIR, topDir, ...paths);
  };
};

for (let dir in TOP_DIRS_MAP) {
  if (TOP_DIRS_MAP.hasOwnProperty(dir)) {
    exports[dir] = joint(TOP_DIRS_MAP[dir]);
  }
}

module.exports.assets = ASSETS_DIR;

module.exports.getChildDirs = (srcPath) => {
  return fs.readdirSync(srcPath).filter((file) => {
    return fs.statSync(path.join(srcPath, file)).isDirectory();
  });
};

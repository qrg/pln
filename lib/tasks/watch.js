'use strict';

const gulp = require('gulp');

module.exports = () => {
  gulp.watch('src/**/*.*', (event) => {
    const p = event.path;
    const e = event.type;
    console.log(p);
    console.log(e);
  });
};

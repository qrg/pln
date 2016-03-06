'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const yaml = require('gulp-yaml');
const ect = require('gulp-ect');

const src = require('../dirs').src;
const dist = require('../dirs').dist;

/*try {
 const content = yaml.safeLoad(fs.readFileSync(yml, 'utf8'));
 const html = renderer.render('index.ect', content);
 fs.writeFileSync(output, html, 'utf8');
 console.log(html);
 } catch (err) {
 console.error(err);
 }*/

module.exports = (projects) => {

  const p = projects.target;

  if (!p) {
    console.error('Nothing to do.');
    return;
  }

  // FIXME
  //const ymls =

  const template = p.getTemplatesPath();
  const contentsPath = path.join(p.getContentsPath(), '**', '*.yml');

  console.log(contentsPath);

  return gulp.src(contentsPath)
    .pipe(yaml({safe: true}))
    .pipe(gulp.dest(dist()).on('end', () => {
      console.log('end!');
    }));

};

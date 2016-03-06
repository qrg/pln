'use strict';

const src = require('../dirs').src;

module.exports = () => {
  const inputFile = src(project, 'assets', 'css', 'main.css');
  const outputDir = `${DIST_DIR}/${project}/assets/css`;
  const htmls = [dist(project, '**', '*.html')];

  return gulp.src(inputFile)
    .pipe(uncss({html: htmls}))
    .pipe(gulp.dest(outputDir));
};

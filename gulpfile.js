'use strict';

const fs = require('fs');
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const Promise = require('bluebird');

const Projects = require('./lib/projects');
const projects = new Projects();

let target = projects.find({name: argv.project});

const inquire = require('./lib/tasks/inquire');
const buildHtml = require('./lib/tasks/build-html');

/*;
 gulp.task('watch', ['inquire'], runWatch);
 gulp.task('serve', ['inquire'], runBrowserSync);
 gulp.task('uncss', ['inquire'], runUncss); // remove unused css definitions*/
//gulp.task('deploy', runDeploy);
//gulp.task('sample', require('./sample'));

gulp.task('default', ['inquire', 'build-html']);
gulp.task('inquire', () => {
  return new Promise((resolve, reject) => {
    inquire(projects).then((answers) => {
      if (answers.target !== 'create') {
        projects.activate({id: answers.target});
        resolve();
      }
      // create new project
      reject();
    });
  });
});
gulp.task('build-html', ['inquire'], () => {
  return buildHtml(projects);
});

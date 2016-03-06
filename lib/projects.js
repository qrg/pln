'use strict';

const path = require('path');

const without = require('lodash/without');
const find = require('lodash/find');

const src = require('./dirs').src;
const assets = require('./dirs').assets;
const getChildDirs = require('./dirs').getChildDirs;

const Project = require('./project');

const scanCategoryPaths = () => {
  const dirs = getChildDirs(src());
  return without(dirs, assets).map((dirName) => {
    return src(dirName);
  });
};

const scanProjectPaths = () => {
  let paths = [];

  scanCategoryPaths().forEach((categoryPath) => {
    const child = getChildDirs(categoryPath);
    const projectPaths = without(child, assets).map((dirName) => {
      return path.join(categoryPath, dirName);
    });
    paths = paths.concat(projectPaths);
  });

  return paths;
};

module.exports = class Projects {

  constructor() {
    this.projects = [];
    this.target = null;
    this.scan();
  }

  create(props) {
    return new Project(props);
  }

  add(project) {
    this.projects.push(project);
    return project;
  }

  getAll() {
    return this.projects;
  }

  getCategories() {
    return scanCategoryPaths().map((p) => {
      return path.basename(p);
    });
  }

  find(props) {
    return find(this.projects, props);
  }

  activate(props) {
    const target = this.find(props);
    this.inactivateAll();
    if (target) {
      this.target = target;
      return this.target;
    }
  }

  inactivateAll() {
    this.target = null;
  }

  scan() {
    if (this.projects.length > 0 ) {
      this.reset();
    }

    scanProjectPaths().map((p) => {
      return p.split(path.sep);
    }).forEach((dirs) => {
      const project = this.create({
        name: dirs[dirs.length - 1],
        category: dirs[dirs.length - 2]
      });
      this.add(project);
    });
  }

  reset() {
    if (!this.projects.isArray) {
      this.projects.length = 0;
    }
    return this.projects = [];
  }
};

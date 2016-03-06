'use strict';

const path = require('path');
const src = require('./dirs').src;

const TEMPLATES = 'templates';
const CONTENTS = 'contents';

module.exports = class Project {

  constructor(props) {
    const options = Object.assign({
      name: '',
      category: ''
    }, props);

    this.name = options.name;
    this.category = options.category;
    this.id = path.join(this.category, this.name);
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getPath() {
    return src(this.getCategory(), this.getName());
  }

  getTemplatesPath() {
    return path.join(`${this.getPath()}`, TEMPLATES);
  }

  getContentsPath() {
    return path.join(`${this.getPath()}`, CONTENTS);
  }

  getCategory() {
    return this.category;
  }

};

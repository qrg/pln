'use strict';

const Promise = require('bluebird');
const inquirer = require('inquirer');

module.exports = (projects) => {

  const list = projects.getAll();
  const target = projects.target;

  const newLabel = {
    name: 'create new project',
    value: 'create'
  };
  const options = [new inquirer.Separator(), newLabel];
  const choices = list.map((project) => {
    return project.getId();
  }).concat(options);

  return new Promise((resolve, reject) => {

    if (target) {
      return resolve({target: target});
    }

    inquirer.prompt([
      {
        type: 'list',
        name: 'target',
        message: 'select project.',
        choices: choices,
        paginated : true
      }, {
        type: 'list',
        name: 'newProjectCategory',
        message: 'select new project\'s category.',
        choices: projects.getCategories(),
        when: (answers) => {
          return answers.target === newLabel.value;
        }
      }, {
        type: 'input',
        name: 'newProjectName',
        message: 'Input new project\'s name.',
        validate: (val) => {
          return (val && val !== '');
        },
        when: (answers) => {
          return answers.target === newLabel.value;
        }
      }
    ], (answers) => {
      return resolve(answers);
    });

  });
};

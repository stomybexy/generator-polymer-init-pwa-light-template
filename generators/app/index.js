'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the swell ${chalk.red(
          'generator-polymer-init-pwa-light-template'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
        default: 'My app'
      },
      {
        type: 'input',
        name: 'appDescription',
        message: 'What is the description of your app?',
        default: 'My awesome app'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const packageName = changeCase.paramCase(this.props.appName);
    this.fs.copyTpl(`${this.templatePath()}/**/*`, this.destinationPath(), {
      ...this.props,
      packageName
    });
  }

  install() {
    this.npmInstall();
  }
};

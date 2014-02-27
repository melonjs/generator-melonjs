'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var MelonjsGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      var options = this.options;
      this.installDependencies({
        skipInstall: options['skip-install'],
        callback: function () {
          this.spawnCommand('grunt');
        }.bind(this) // bind the callback to the parent scope
      });
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('Hi! It\'s time to build great games with MelonJS'));

    var prompts = [
      {
        name: 'gameName',
        message:  'What\'s the name of your game?'
      },
    ];

    this.prompt(prompts, function (props) {
      this.gameName = props.gameName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('js');
    this.mkdir('build');
    this.mkdir('css');
    this.mkdir('data');
    this.mkdir('data/img');
    this.mkdir('js/lib');
    this.mkdir('js/screens');
    // empty for now
    this.mkdir('js/entities');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_Makefile', 'Makefile');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('index.html', 'index.html');
    this.copy('css/index.css', 'css/index.css');
    this.copy('build/game.js', 'build/game.js');
    this.copy('build/game-min.js', 'build/game-min.js');
    this.copy('js/game.js', 'js/game.js');
    this.copy('js/resources.js', 'js/resources.js');
    this.copy('js/screens/play.js', 'js/screens/play.js');
    this.copy('js/lib/melonJS-1.0.0-min.js', 'js/lib/melonJS-1.0.0-min.js');
    this.copy('data/img/melonjs.png', 'data/img/melonjs.png');
    this.copy('data/img/bg.png', 'data/img/bg.png');
  }
});

module.exports = MelonjsGenerator;
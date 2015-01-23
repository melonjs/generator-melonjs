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
            var npmDir = process.cwd() + '/' + this.gameName;
            process.chdir(npmDir);
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

        // replace it with a short and sweet description of your generator
        console.log(chalk.bold.green('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00'));
        console.log(chalk.bold.green('OOOOOOOOOOOOOOOOOOOOOOOZ. I7? =OOOO000000'));
        console.log(chalk.bold.green('OOOOOOOOOOOOOOOOOOO    ,OOOOOOOOOOOOI?OOO'));
        console.log(chalk.bold.green('OOOOOOOOOOOOOOO, .OOOOOOOOOOOOOOOO, OOO00'));
        console.log(chalk.bold.green('OOOOOOOOOOOO, ~OOOOOOOOOOOOOOOOOO+    ,OO'));
        console.log(chalk.bold.green('OOOOOOOOOO .OOOOOOOOOOOOOOOOOOOO       OO'));
        console.log(chalk.bold.green('OOOOOOO, OOOOOOOOOOOOOOOOOOOOO:        OO'));
        console.log(chalk.bold.green('OOOOO~ OOOOOOOOOOOOOOOOOOOOO+          OO'));
        console.log(chalk.bold.green('OOOO OOOOOOOOOOOOOOOOOOOOO,            IO'));
        console.log(chalk.bold.green('OO..OOOOOOOOOOOOOOOOOOOO               OO'));
        console.log(chalk.bold.green('O,IOOOOOOOOOOOOOOOOO?                  OO'));
        console.log(chalk.bold.green('O OOOOOOOOOOOOOOZ                      ?O'));
        console.log(chalk.bold.green('O ZOOOOOOOOO~                          ZO'));
        console.log(chalk.bold.green('OO                                     OO'));
        console.log(chalk.bold.green('OOO:                                  OOO'));
        console.log(chalk.bold.green('OOOOO                                OOOO'));
        console.log(chalk.bold.green('OOOOOOO~                            ZOOOO'));
        console.log(chalk.bold.green('OOOOOOOOOOO7.             ~OOOOOOOOOOOOOO'));
        console.log(chalk.bold.green('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00'));
        console.log(chalk.bold.green('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00'));
        console.log('Hi! It\'s time to build great games with MelonJS');

        var prompts = [
            {
                name: 'gameName',
                message:    'What\'s the name of your game?'
            },
        ];

        this.prompt(prompts, function (props) {
            this.gameName = this._.slugify(props.gameName);
            this.name = props.gameName;

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir(this.gameName);
        this.mkdir(this.gameName + '/js');
        this.mkdir(this.gameName + '/build');
        this.mkdir(this.gameName + '/css');
        this.mkdir(this.gameName + '/data');
        this.mkdir(this.gameName + '/data/img');
        this.mkdir(this.gameName + '/js/screens');
        // empty for now
        this.mkdir(this.gameName + '/js/entities');

        this.copy('_package.json', this.gameName + '/package.json');
        this.copy('_bower.json', this.gameName + '/bower.json');
        this.copy('_Gruntfile.js', this.gameName + '/Gruntfile.js');
        this.copy('_manifest.json', this.gameName + '/manifest.json');
    },

    projectfiles: function () {
        this.copy('jshintrc', this.gameName + '/.jshintrc');
        this.copy('gitignore',this.gameName +  '/.gitignore');
        this.copy('index.html', this.gameName + '/index.html');
        this.copy('css/index.css', this.gameName + '/css/index.css');
        this.copy('build/game.js', this.gameName + '/build/game.js');
        this.copy('build/game-min.js', this.gameName + '/build/game-min.js');
        this.copy('js/game.js', this.gameName + '/js/game.js');
        this.copy('js/resources.js', this.gameName + '/js/resources.js');
        this.copy('js/screens/play.js', this.gameName + '/js/screens/play.js');
        this.copy('js/debugPanel.js', this.gameName + '/js/debugPanel.js');
        this.copy('data/img/melonjs.png', this.gameName + '/data/img/melonjs.png');
        this.copy('data/img/bg.png', this.gameName + '/data/img/bg.png');
        this.copy('data/img/icon-152x152.png', this.gameName + '/data/img/icon-152x152.png');
        this.copy('data/img/icon-192x192.png', this.gameName + '/data/img/icon-192x192.png');
    }
});

module.exports = MelonjsGenerator;
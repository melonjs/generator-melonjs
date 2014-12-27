/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('melonjs generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('melonjs:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.gitignore',
            'package.json',
            'bower.json',
            'Gruntfile.js',
            'index.html',
            'css/index.css',
            'data/img/bg.png',
            'data/img/melonjs.png',
            'js/game.js',
            'js/screens/play.js',
            'js/debugPanel.js',
        ];

        helpers.mockPrompt(this.app, {
            'gameName': 'test'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            for (var i = 0; i < expected.length; i++) {
                var filename = path.join(__dirname, 'temp', 'test', expected[i]);
                helpers.assertFile(filename);
            }
            done();
        });
    });
});

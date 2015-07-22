/**
 * @author    carlosperate
 * @copyright 2015 carlosperate https://github.com/carlosperate
 * @license   Licensed under the The MIT License (MIT), a copy can be found in
 *            the electron project directory LICENSE file.
 *
 * @fileoverview Manages the Ardublockly server.
 */
'use strict';

var os = require('os');
var dialog = require('dialog');
var winston = require('winston');
var jetpack = require('fs-jetpack');
var childProcess = require('child_process');
var env = require('./vendor/electron_boilerplate/env_config');

var tag = '[Server mgr] '

var serverProcess = null;
var ardublocklyRootDir = null;

module.exports.getProjectJetpack = function() {
    if (ardublocklyRootDir == null) {
        // First, work out the project root directory
        if (env.name === 'development') {
            // In dev mode the file cwd is on the project/package/electron dir
            ardublocklyRootDir = jetpack.dir('../../');
        } else {
            // Cannot use relative paths in build, so let's try to find the
            // ardublockly folder in a node from the executable file path tree
            var ardublocklyRootDir = jetpack.dir(__dirname);
            var oldArdublocklyRootDir = '';
            while (ardublocklyRootDir.path() != oldArdublocklyRootDir) {
                //winston.log('info', tag + 'Search for Ardublockly project ' +
                //            'dir: ' + ardublocklyRootDir.cwd());
                // Check if /ardublokly/index.html exists within current path
                if (jetpack.exists(
                        ardublocklyRootDir.path('ardublockly', 'index.html'))) {
                    // Found the right folder, break with this dir loaded
                    break;
                }
                oldArdublocklyRootDir = ardublocklyRootDir.path();
                ardublocklyRootDir = ardublocklyRootDir.dir('../');
            }

            if (ardublocklyRootDir.path() == oldArdublocklyRootDir) {
                ardublocklyRootDir = jetpack.dir('.');
                ardublocklyNotFound(ardublocklyRootDir.path('.'));
            }
        }
        winston.info(tag + 'Ardublockly root dir: ' + ardublocklyRootDir.cwd());
    }

    return ardublocklyRootDir;
};

function getServerExecLocation() {
    // Relevant OS could be win32, linux, darwin
    winston.info(tag + 'OS detected: ' + process.platform);

    var ardublocklyProjRootDir = module.exports.getProjectJetpack();

    // Then, work out the location of the python executable files
    if (process.platform == "darwin") {
        var arduexecDir = ardublocklyProjRootDir.dir('arduexec.app/server');
    } else {
        var arduexecDir = ardublocklyProjRootDir.dir('arduexec/server');
    }

    // Finally, work out the name of the executable
    var arduexecFileName = 'start';
    if (process.platform == "win32") {
        arduexecFileName += '.exe';
    }

    var executableLocation = arduexecDir.path(arduexecFileName);
    winston.info(tag + 'Server executable: ' + executableLocation);
    return executableLocation;
};

function ardublocklyNotFound(working_dir) {
    dialog.showMessageBox({
        type: "warning",
        title: "Server Error",
        buttons: ["ok"],
        message: "The Ardublockly folder could not be found within the " +
                 "execution directory:\n" + working_dir + "\nThe application " +
                 "won't be able to function properly."
    });
};

module.exports.startServer = function() {
    if (serverProcess === null) {
        var serverExecLocation = getServerExecLocation();
        winston.info(tag + 'Command: ' + serverExecLocation +
                     ' --findprojectroot --nobrowser');
        serverProcess = childProcess.spawn(
                serverExecLocation, ['--findprojectroot', '--nobrowser']);

        // Setting the listeners
        serverProcess.stdout.on('data', function (data) {
            winston.info('[Ardublockly server] ' + data);
        });

        serverProcess.stderr.on('data', function (data) {
            winston.error('[Ardublockly server] ' + data);
        });

        serverProcess.on('close', function (code) {
            if (code !== 0) {
                winston.info('[Ardublockly server] Process exited with code ' +
                             code);
            }
            serverProcess = null;
        });
    }
};

module.exports.stopServer = function() {
    if (serverProcess !== null) {
        // Server executable needs to clean up (kill child), so no SIGKILL
        serverProcess.kill('SIGTERM');
        serverProcess = null;
    }
};

module.exports.restartServer = function() {
    module.exports.stopServer();
    setTimeout(function() {
        module.exports.startServer();
    }, 1000);
};

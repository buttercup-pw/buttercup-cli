#!/usr/bin/env node

"use strict";

const argv = require("minimist")(process.argv.slice(2));

// Bindings init
const nativeBindings = require("buttercup-native-bindings");

// Fetch config
const Config = nativeBindings.Config;
Config
    .loadFromDefault("ButtercupCLI")
    .then(function(config) {
        global.config = config;

        const openArchiveHandler = require("./nav/open-archive.js");
        const mainMenu = require("./nav/main-menu.js");
        const getTitle = require("./resources/title.js");

        let archiveFilename = argv._[0];

        console.log(getTitle());

        if (archiveFilename) {
            return openArchiveHandler
                .openFile(archiveFilename);
        }

        return mainMenu
            .presentMenu()
            .then(function() {
                console.log("Goodbye.");
            })
            .catch(function(err) {
                console.error("Process failed...");
                setTimeout(function() {
                    throw err;
                }, 0);
            });
    });

const read = require("read");
const pify = require("pify");
const { parseCommandString } = require("./parsing.js");
const { getAppContext } = require("./app.js");
const { colourPath, colourSeparator, getSeparator } = require("./terminal.js");

const readPrompt = pify(read);

function getLoginPassword() {
    return readPrompt({
        prompt: "Password: ",
        terminal: true,
        silent: true
    });
}

function getPrompt() {
    const context = getAppContext();
    switch (context.section) {
        case "archive":
            return colourPath(context.archiveName) + colourSeparator(getSeparator());
        case "entry":
            /* falls-through */
        case "group":
            return colourPath(context.currentTitle) + colourSeparator(getSeparator());
        default:
            throw new Error(`Unable to create prompt: Invalid section: ${context.section}`);
    }
}

function getUserCommand() {
    return getUserInput()
        .then(function(inputText) {
            return parseCommandString(inputText);
        });
}

function getUserInput() {
    return readPrompt({
        prompt: getPrompt(),
        terminal: true
    });
}

module.exports = {
    getLoginPassword,
    getUserCommand
};

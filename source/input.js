const input = require("input");
const { parseCommandString } = require("./parsing.js");
const { getAppContext } = require("./app.js");
const { colourPath, colourSeparator, getSeparator } = require("./terminal.js");

function getLoginPassword() {
    return input.password("Password: ");
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
    return input.text(getPrompt());
}

module.exports = {
    getLoginPassword,
    getUserCommand
};

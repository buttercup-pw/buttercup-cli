const read = require("read");
const pify = require("pify");
const { parseCommandString } = require("./parsing.js");

const readPrompt = pify(read);

function getLoginPassword() {
    return readPrompt({
        prompt: "Password: ",
        terminal: true,
        silent: true
    });
}

function getUserCommand() {
    return getUserInput()
        .then(function(inputText) {
            return parseCommandString(inputText);
        });
}

function getUserInput() {
    return readPrompt({
        prompt: "Prompt> ", // todo
        terminal: true
    });
}

module.exports = {
    getLoginPassword,
    getUserCommand
};

const chalk = require("chalk");

function colourCommand(text) {
    return text;
}

function colourPath(text) {
    return chalk.blue(text);
}

function colourSeparator(text) {
    return chalk.gray(text);
}

function colourTitle(text) {
    return chalk.underline.white(text);
}

module.exports = {
    colourCommand,
    colourPath,
    colourSeparator,
    colourTitle
};

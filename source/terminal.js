const chalk = require("chalk");
const hasUnicode = require("has-unicode");

function colourCommand(text) {
    return text;
}

function colourItemTitle(text) {
    return chalk.bold(text);
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

function dimColour(text) {
    return chalk.dim(text);
}

function getSeparator() {
    return hasUnicode() ?
        " 🔓 " :
        "» ";
}

module.exports = {
    colourCommand,
    colourItemTitle,
    colourPath,
    colourSeparator,
    colourTitle,
    dimColour,
    getSeparator
};

const QUOTED_TEXT = /^\"((\\\"|[^\"]+)+)\"/;
const SPACE = /^\s+/;
const WORD = /^(\w+)/;

function parseCommandString(command) {
    const parts = [];
    let inQuotes = false;
    while (command.length > 0) {
        if (QUOTED_TEXT.test(command)) {
            const quotedText = command.match(QUOTED_TEXT)[1];
            command = command.substr(quotedText.length + 2); // include quotes
            parts.push(quotedText);
        } else if (WORD.test(command)) {
            const word = command.match(WORD)[1];
            command = command.substr(word.length);
            parts.push(word);
        } else if (SPACE.test(command)) {
            const spaceText = command.match(SPACE)[0];
            command = command.substr(spaceText.length);
        } else {
            throw new Error(`Invalid command portion: ${command.slice(0, 15)}`);
        }
    }
    return parts;
}

module.exports = {
    parseCommandString
};

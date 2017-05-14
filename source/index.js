const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const PrettyError = require("pretty-error");
const { version } = require("../package.json");
const { colourTitle } = require("./terminal.js");
const { loadArchiveFromFile } = require("./buttercup.js");
const { getUserCommand } = require("./input.js");
const { processCommand } = require("./logic.js");
const { getAppContext } = require("./app.js");
console.log(`${colourTitle("Buttercup")} v${version}`);

const filePath = argv._[0];
if (!filePath) {
    throw new Error("Expected archive filename");
}

getAppContext().archiveName = path.basename(filePath);

function prompt() {
    getUserCommand()
        .then(command => processCommand(command))
        .then(prompt);
}

loadArchiveFromFile(filePath)
    .then(prompt)
    .catch(function(err) {
        const pe = new PrettyError();
        pe.render(err);
        setTimeout(prompt, 250);
    });

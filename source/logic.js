const { listGroups, selectGroupByIndex, selectPreviousGroup } = require("./buttercup.js");

function handleGroupsCommand(commandParts) {
    const primary = commandParts.shift();
    switch (primary) {
        case "back":
            /* falls-through */
        case "parent":
            selectPreviousGroup();
            break;
        case "list":
            listGroups();
            break;
        case "select": {
            const index = commandParts.shift();
            selectGroupByIndex(index);
            break;
        }
        default:
            console.error(`Unrecognised groups command: ${primary}`);
    }
}

function processCommand(commandParts) {
    const primary = commandParts.shift();
    switch (primary) {
        case "groups":
            return handleGroupsCommand(commandParts);
        case "quit":
            /* falls-through */
        case "exit":
            console.log("");
            process.exit(0);
            break;
        default:
            console.error(`Unrecognised command: ${primary}`);
    }
}

module.exports = {
    processCommand
};

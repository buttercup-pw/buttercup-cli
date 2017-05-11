const { listGroups, selectGroupByIndex, selectPreviousGroup } = require("./buttercup.js");
const { getSharedWorkspace } = require("./buttercup.js");
const { colourTitle, colourItemTitle, dimColour } = require("./terminal.js");

const INDENT = "   ";

function displayTree() {
    const workspace = getSharedWorkspace();
    const archive = workspace.primary.archive;
    const getIndentation = (amount) => {
        let ind = "";
        while (amount > 0) {
            ind += INDENT;
            amount -= 1;
        }
        return ind;
    }
    const renderTreeNode = (node, level = 0) => {
        const nodeTitle = node.getTitle ?
            node.getTitle() :
            "Archive";
        const indent = getIndentation(level);
        console.log(indent + colourTitle(nodeTitle));
        if (typeof node.getEntries === "function" && node.getEntries().length > 0) {
            node.getEntries().forEach(function(entry) {
                console.log(indent + "   " + colourItemTitle(entry.getProperty("title")));
            });
        }
        node.getGroups().forEach(group => renderTreeNode(group, level + 1));
    };
    renderTreeNode(archive);
}

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
        case "tree":
            return displayTree();
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

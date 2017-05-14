const { Workspace, FileDatasource, createCredentials } = require("buttercup");
const { getLoginPassword } = require("./input");
const { getAppContext } = require("./app.js");
const { colourItemTitle, dimColour } = require("./terminal.js");

let __workspace = null;

function getCurrentGroupsArray() {
    const context = getAppContext();
    const workspace = getSharedWorkspace();
    const archive = workspace.primary.archive;
    let groups;
    if (context.section === "archive") {
        groups = archive.getGroups();
    } else if (context.section === "group") {
        const group = archive.findGroupByID(context.currentGroupID);
        groups = group.getGroups();
    } else {
        throw new Error(`Failed getting current groups: Not in correct context: ${context.section}`);
    }
    return groups;
}

function getSharedWorkspace() {
    return __workspace;
}

function listEntries() {
    const context = getAppContext();
    if (context.currentGroupID && context.section === "group") {
        const workspace = getSharedWorkspace();
        const archive = workspace.primary.archive;
        const group = archive.findGroupByID(context.currentGroupID);
        const entries = group.getEntries();
        if (entries.length > 0) {
            entries.forEach(function(entry, index) {
                const entryID = dimColour(`(${entry.getID()})`);
                const indexTxt = `${index + 1}.`;
                console.log(` ${indexTxt} ${colourItemTitle(entry.getProperty("title"))} ${entryID}`);
            });
        } else {
            console.log("No entries available: Empty group");
        }
    } else if (context.section === "archive") {
        console.log("At archive level: no entries available");
    } else {
        throw new Error(`Failed listing entries: Unknown context: ${context.section}`);
    }
}

function listGroups() {
    const groups = getCurrentGroupsArray();
    groups.forEach(function(group, index) {
        const groupID = dimColour(`(${group.getID()})`);
        const indexTxt = `${index + 1}.`;
        console.log(` ${indexTxt} ${colourItemTitle(group.getTitle())} ${groupID}`);
    });
}

function loadArchiveFromFile(filename) {
    const fds = new FileDatasource(filename);
    return getLoginPassword()
        .then(password => createCredentials.fromPassword(password))
        .then(credentials => fds.load(credentials).then(archive => [archive, credentials]))
        .then(function([archive, credentials]) {
            const workspace = new Workspace();
            workspace.setPrimaryArchive(archive, fds, credentials);
            setSharedWorkspace(workspace);
        });
}

function logCurrentGroup() {
    const context = getAppContext();
    if (context.currentGroupID && context.section === "group") {
        const workspace = getSharedWorkspace();
        const archive = workspace.primary.archive;
        const group = archive.findGroupByID(context.currentGroupID);
        const groupName = colourItemTitle(group.getTitle());
        const groupID = dimColour(`(${group.getID()})`);
        console.log(`Current group: ${groupName} ${groupID}`);
    }
}

function selectGroupByIndex(index) {
    const context = getAppContext();
    const groups = getCurrentGroupsArray();
    const realIndex = parseInt(index, 10) - 1;
    const group = groups[realIndex];
    if (!group) {
        throw new Error(`Failed selecting group: Possible invalid index: ${realIndex} (displayed: ${index})`);
    }
    context.section = "group";
    context.currentGroupID = group.getID();
    context.currentEntryID = null;
    context.currentTitle = group.getTitle();
    logCurrentGroup();
}

function selectPreviousGroup() {
    const context = getAppContext();
    if (context.currentGroupID === null || context.section === "archive") {
        console.error("No parent from current location");
        return;
    }
    const workspace = getSharedWorkspace();
    const archive = workspace.primary.archive;
    const group = archive.findGroupByID(context.currentGroupID);
    const parent = group.getGroup();
    if (parent) {
        context.currentGroupID = parent.getID();
        context.section = "group";
        context.currentTitle = parent.getTitle();
        logCurrentGroup();
    } else {
        // no parent, use archive
        context.currentGroupID = null;
        context.section = "archive";
        context.currentTitle = "";
        console.log("At archive level");
    }
}

function setSharedWorkspace(ws) {
    __workspace = ws;
}

module.exports = {
    getSharedWorkspace,
    listEntries,
    listGroups,
    loadArchiveFromFile,
    selectGroupByIndex,
    selectPreviousGroup,
    setSharedWorkspace
};

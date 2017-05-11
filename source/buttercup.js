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
    console.log(`Selected group ${context.currentGroupID}`);
}

function setSharedWorkspace(ws) {
    __workspace = ws;
}

module.exports = {
    getSharedWorkspace,
    listGroups,
    loadArchiveFromFile,
    selectGroupByIndex,
    setSharedWorkspace
};

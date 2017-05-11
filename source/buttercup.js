const { Workspace, FileDatasource, createCredentials } = require("buttercup");
const { getLoginPassword } = require("./input");

let __workspace = null;

function getSharedWorkspace() {
    return __workspace;
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

function setSharedWorkspace(ws) {
    __workspace = ws;
}

module.exports = {
    getSharedWorkspace,
    loadArchiveFromFile,
    setSharedWorkspace
};

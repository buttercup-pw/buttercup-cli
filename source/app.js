let __app = null;

function getAppContext() {
    if (__app === null) {
        __app = getNewContext();
    }
    return __app;
}

function getNewContext() {
    return {
        archiveName: null,
        section: "archive",
        currentGroupID: null,
        currentEntryID: null,
        currentTitle: ""
    };
}

module.exports = {
    getAppContext
};

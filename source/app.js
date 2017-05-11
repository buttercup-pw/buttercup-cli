let __app = null;

function getAppContext() {
    if (__app === null) {
        __app = getNewContext();
    }
    return __app;
}

function getNewContext() {
    return {
        section: "archive",
        currentGroupID: null,
        currentEntryID: null
    };
}

module.exports = {
    getAppContext
};

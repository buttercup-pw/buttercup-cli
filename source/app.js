let __app = null;

function getAppContext() {
    if (__app === null) {
        __app = getNewContext();
    }
    return __app;
}

function getNewContext() {
    return {
        context: "archive",
        currentGroupID: null,
        currentEntryID: null
    };
}

module.exports = {
    getAppContext
};

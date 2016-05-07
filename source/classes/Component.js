"use strict";

const screen = global.screen;

module.exports = class Component {

    constructor() {
        this.element = null;
        this.screen = screen;

        this._hasInitialised = false;
    }

    appendToElement(node) {
        if (!this._hasInitialised) {
            this.init();
        }
        node.append(this.element);
        this.render();
    }

    appendToScreen(scr) {
        if (!this._hasInitialised) {
            this.init();
        }
        scr.append(this.element);
        this.render();
    }

    focus() {
        this.element.focus();
    }

    init() {
        this._hasInitialised = true;
    }

    render() {
        this.screen.render();
    }

}

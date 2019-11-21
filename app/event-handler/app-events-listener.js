'use strict'

module.exports = class AppEventsListener {

    constructor(app) {
        this.app = app
        this.registerEventListener()
    }

    /**
     * 注册事件侦听者
     */
    registerEventListener() {
        this.app.messenger.on('update-node-template', data => {
            this.app.config.nodeTemplate = data
        })
    }
}
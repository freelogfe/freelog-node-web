'use strict'

module.exports = (app) => {

    app.beforeStart(async () => {
        await app.runSchedule('update-node-template');
    })

    app.messenger.on('update-node-template', data => {
        app.config.nodeTemplate = data
    });
}
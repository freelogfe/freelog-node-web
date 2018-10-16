'use strict'

module.exports = async (app) => {

    app.beforeStart(async () => {
        await app.runSchedule('update-node-template');
    })

    app.messenger.on('update-node-template', data => {
        app.config.nodeTemplate = data
    });
    setTimeout(function () {
        console.log(app.middlewares)
    }, 1000)

}
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

    const {router, controller} = app;

    router.get('/home/triggerUpdateNodeTemplateEvent', controller.home.triggerUpdateNodeTemplateEvent)

    router.get('/*', controller.home.nodeHomeIndex);
};

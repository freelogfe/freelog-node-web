'use strict'

const MongooseBase = require('egg-freelog-database/lib/database/mongo-base-operation')

/**
 * WIKI: http://www.github.com/yuliang0912/egg-freelog-database/lib/mongo-base-operation.js
 * @type {module.ContractProvider}
 */
module.exports = class ContractProvider extends MongooseBase {
    constructor(app) {
        super(app.model.Contract)
        this.app = app
    }
}

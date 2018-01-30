'use strict'

const KnexBaseOperation = require('egg-freelog-database/lib/database/knex-base-operation')

module.exports = class NodeProvider extends KnexBaseOperation {

    constructor(app) {
        super(app.knex.node("nodePageBuild"), 'id')
        this.app = app
    }

    /**
     * 查询nodePageBuild
     * @param condition
     * @returns {*}
     */
    getNodePageBuild(condition) {
        return super.find(condition).first()
    }
}
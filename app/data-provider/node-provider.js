'use strict'

const KnexBaseOperation = require('egg-freelog-database/lib/database/knex-base-operation')

module.exports = class NodeProvider extends KnexBaseOperation {

    constructor(app) {
        super(app.knex.node("nodeinfo"), 'nodeId')
        this.app = app
    }

    /**
     * 查询单个节点
     * @param condition
     */
    getNodeInfo(condition) {
        return super.findOne(condition)
    }
}
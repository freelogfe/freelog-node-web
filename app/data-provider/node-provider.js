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

    /**
     * 获取多个节点
     * @param condition 资源查找条件
     * @returns {Promise.<*>}
     */
    getNodeList(condition, page, pageSize) {
        return super.findPageList({
            where: condition,
            page, pageSize,
            orderBy: "createDate"
        })
    }

    /**
     * 获取数量
     * @param condition
     * @returns {*}
     */
    getCount(condition) {
        return super.count("nodeId", condition)
    }
}
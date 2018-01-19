/**
 * Created by yuliang on 2017/10/31.
 */

'use strict'

module.exports = app => {

    const {knex, type} = app

    return {

        /**
         * 查询单个节点
         * @param condition
         */
        getNodeInfo(condition) {

            if (!type.object(condition)) {
                return Promise.reject(new Error("condition must be object"))
            }

            return knex.node('nodeinfo').where(condition).first()
        },

        /**
         * 获取多个节点
         * @param condition 资源查找条件
         * @returns {Promise.<*>}
         */
        getNodeList(condition, page, pageSize) {

            if (!type.object(condition)) {
                return Promise.reject(new Error("condition must be object"))
            }

            return knex.node('nodeinfo').where(condition)
                .limit(pageSize).offset((page - 1) * pageSize)
                .orderBy('nodeId', 'desc')
                .select()
        },

        /**
         * 获取数量
         * @param condition
         * @returns {*}
         */
        getCount(condition) {

            if (!type.object(condition)) {
                return Promise.reject(new Error("condition must be object"))
            }

            return knex.node('nodeinfo').where(condition).count("nodeId as count").first()
        }
    }
}
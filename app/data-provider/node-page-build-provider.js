/**
 * Created by yuliang on 2017/10/31.
 */

'use strict'

module.exports = app => {

    const {knex, type} = app

    return {
        /**
         * 更新节点pb
         * @param model
         * @returns {Promise|Promise.<*>}
         */
        updateNodePageBuild(model, condition) {

            if (!type.object(model)) {
                return Promise.reject(new Error("model must be object"))
            }

            if (!type.object(condition)) {
                return Promise.reject(new Error("condition must be object"))
            }

            return knex.node('nodepagebuild').update(model).where(condition)
        },

        /**
         * 查询nodePageBuild
         * @param condition
         * @returns {*}
         */
        getNodePageBuild(condition) {

            if (!type.object(condition)) {
                return Promise.reject(new Error("condition must be object"))
            }

            return knex.node('nodepagebuild').where(condition).first()
        },

        /**
         * 查询nodePageBuild
         * @param condition
         * @returns {*}
         */
        getNodePageBuildList(condition) {

            if (!type.object(condition)) {
                return Promise.reject(new Error("condition must be object"))
            }

            return knex.node('nodepagebuild').where(condition).select()
        },

        /**
         * 更新状态
         * @param nodeId
         * @param id
         * @param status
         * @returns {*}
         */
        updateNodePageBuildStatus(nodeId, id, status) {

            return knex.node.transaction(trans => {
                let task1 = knex.node('nodepagebuild').transacting(trans).update({status}).where({nodeId, id})
                let task2 = status === 1
                    ? knex.node('nodepagebuild').transacting(trans).update({status: 2}).where({nodeId}).where('id', '<>', id)
                    : undefined

                return Promise.all([task1, task2]).then(trans.commit).catch(trans.rollback).catch(err => {
                    return err
                })
            })
        }
    }
}
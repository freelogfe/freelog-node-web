/**
 * Created by yuliang on 2017/11/17.
 */

'use strict'

const Subscription = require('egg').Subscription;

module.exports = class UpdateNodeTemplate extends Subscription {

    static get schedule() {
        return {
            cron: '* */20 * * * *', // 15分钟间隔
            type: 'worker',
            immediate: false,
        };
    }

    async subscribe() {

        const {ctx, app, config} = this

        await ctx.curl(config.nodeHomePageTemplateUrl).then(data => {
            app.messenger.sendToApp('update-node-template', data.data.toString())
        }).catch(() => {
            console.error('获取节点模板文件失败.')
        })
    }
}

/**
 * Created by yuliang on 2017/10/26.
 */

'use strict'

const commonRegex = require('egg-freelog-base/app/extend/helper/common_regex')

/**
 * node 主域名检查中间件
 * @param app
 */
module.exports = (option, app) => {

    return async function (ctx, next) {
        try {

            let nodeDomain = ctx.host.replace('.freelog.com', '')

            if (!commonRegex.nodeDomain.test(nodeDomain)) {
                ctx.body = '<h1>sorry,this is not freelog website</h1>'
                return
            }

            let nodeInfo = await ctx.app.dataProvider.nodeProvider.getNodeInfo({nodeDomain})
            if (!nodeInfo) {
                ctx.body = '<h1>sorry,this is not freelog website</h1>'
                return
            }
            if (nodeInfo.status === 2) {
                ctx.body = '<h1>sorry,this website has freezed</h1>'
                return
            }

            ctx.request.nodeInfo = nodeInfo

            await next()
        } catch (e) {
            ctx.body = `<h1>出错啦~,error:${e.message}</h1>`
            return
        }
    }
}
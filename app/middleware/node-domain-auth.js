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
            if (ctx.request.url.toLowerCase().startsWith('/home/triggerUpdateNodeTemplateEvent'.toLowerCase())) {
                return await next()
            }

            const nodeDomain = ctx.host.replace(/(\.freelog\.com|\.testfreelog\.com)/i, '')
            if (!commonRegex.nodeDomain.test(nodeDomain)) {
                ctx.body = `<h1>sorry,${nodeDomain} is not freelog website</h1>`
                return
            }
            const nodeInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfo}/detail?nodeDomain=${nodeDomain}`)
            if (!nodeInfo) {
                ctx.body = `<h1>sorry,${nodeDomain} is not freelog website</h1>`
                return
            }
            if (nodeInfo.status === 2) {
                ctx.body = `<h1>sorry,${nodeDomain} is not freelog website</h1>`
                return
            }

            ctx.request.nodeInfo = nodeInfo

            ctx.generateNodeJwtInfo(nodeInfo)

            await next()
        } catch (e) {
            ctx.body = `<h2>出错啦~,error:${e.message}</h2>`
            console.log(e)
            return
        }
    }
}
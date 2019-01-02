'use strict';

const Controller = require('egg').Controller;
const cryptoHelper = require('egg-freelog-base/app/extend/helper/crypto_helper')

module.exports = class HomeController extends Controller {

    constructor({app}) {
        super(...arguments)
    }

    /**
     * 节点主页渲染
     * @param ctx
     * @returns {Promise<void>}
     */
    async nodeHomeIndex(ctx) {

        const {config} = this
        const userId = ctx.request.userId || 0
        const nodeInfo = ctx.request.nodeInfo
        const {nodeId, pageBuildId} = nodeInfo

        if (!pageBuildId) {
            ctx.body = '<h1>节点还未初始化</h1>'
            return
        }

        var widgetToken = '', subResourceIds = ''

        const pbResource = await ctx.curlIntranetApi(`${config.gatewayUrl}/v1/auths/presentable/${pageBuildId}.data?nodeId=${nodeId}`, {
            dataType: 'original',
        }).then(response => {
            console.log(response, response.res.headers, response.data.toString())
            widgetToken = response.res.headers['freelog-sub-resource-auth-token']
            subResourceIds = response.res.headers['freelog-sub-resourceids'] || response.res.headers['freelog-sub-resourceIds']
            if (response.res.headers['content-type'].indexOf('application/json') > -1) {
                return JSON.parse(response.data.toString())
            } else {
                return response
            }
        }).catch(console.error)

        if (!pbResource.res && !pbResource.status) {
            if (pbResource.ret === 2 && (pbResource.errcode === 30 || pbResource.errcode === 28)) {
                ctx.redirect(`https://www.freelog.com/pages/user/login.html?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`)
            }
            ctx.body = ctx.helper.nodeTemplateHelper.convertErrorNodePageBuild(config.nodeTemplate, nodeInfo, userId, pbResource)
            return
        }

        ctx.body = ctx.helper.nodeTemplateHelper.convertNodePageBuild(config.nodeTemplate, pbResource.data.toString(), nodeInfo, userId, widgetToken, subResourceIds)
    }

    /**
     * 触发更新节点模板事件
     * @param ctx
     * @returns {Promise<void>}
     */
    async triggerUpdateNodeTemplateEvent(ctx) {

        const {config, app} = ctx

        await ctx.curl(config.nodeHomePageTemplateUrl).then(data => {
            app.messenger.sendToApp('update-node-template', data.data.toString())
        }).then(() => ctx.success('模板更新成功')).catch(ctx.error)
    }
}



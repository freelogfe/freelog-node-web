'use strict';

const Controller = require('egg').Controller;

module.exports = class HomeController extends Controller {

    /**
     * 节点主页渲染
     * @param ctx
     * @returns {Promise<void>}
     */
    async nodeHomeIndex(ctx) {

        let userId = ctx.request.userId || 0
        let nodeInfo = ctx.request.nodeInfo
        let pageBuild = await ctx.app.dataProvider.nodePageBuildProvider.getNodePageBuild({
            nodeId: nodeInfo.nodeId,
            status: 1
        })

        if (!pageBuild) {
            ctx.body = '<h1>节点还未初始化</h1>'
            return
        }

        let pbResource = await ctx.curlIntranetApi(`${this.config.gatewayUrl}/v1/presentables/resource/${pageBuild.presentableId}.data?nodeId=${nodeInfo.nodeId}`, {dataType: 'original'}).then(response => {
            if (response.res.headers['content-type'].indexOf('application/json') > -1) {
                return JSON.parse(response.data.toString())
            } else {
                return response
            }
        })

        if (!pbResource.res && !pbResource.status) {
            if (pbResource.ret === 2 && pbResource.errcode === 30) {
                ctx.redirect(`http://www.freelog.com/pages/user/login.html?redirect=${encodeURIComponent(`http://${ctx.host}/`)}`)
            }
            ctx.body = ctx.helper.nodeTemplateHelper.convertErrorNodePageBuild(this.config.nodeTemplate, nodeInfo.nodeId, userId, pbResource)
            return
        }

        let widgetRelevancePresentables =
            await ctx.curlIntranetApi(`${this.config.gatewayUrl}/api/v1/presentables/pageBuildAssociateWidgetPresentable?presentableId=${pageBuild.presentableId}`)

        ctx.body = ctx.helper.nodeTemplateHelper.convertNodePageBuild(this.config.nodeTemplate, pbResource.data.toString(), nodeInfo.nodeId, userId, widgetRelevancePresentables)
    }
}



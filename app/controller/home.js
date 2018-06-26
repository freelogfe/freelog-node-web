'use strict';

const Controller = require('egg').Controller;

module.exports = class HomeController extends Controller {

    /**
     * 节点主页渲染
     * @param ctx
     * @returns {Promise<void>}
     */
    async nodeHomeIndex(ctx) {

        const userId = ctx.request.userId || 0
        const nodeInfo = ctx.request.nodeInfo
        const pageBuild = await ctx.dal.nodePageBuildProvider.getNodePageBuild({ nodeId: nodeInfo.nodeId, status: 1 })

        if (!pageBuild) {
            ctx.body = '<h1>节点还未初始化</h1>'
            return
        }

        const pbResource = await ctx.curlIntranetApi(`${this.config.gatewayUrl}/api/v1/auths/presentable/${pageBuild.presentableId}.data?nodeId=${nodeInfo.nodeId}`, { dataType: 'original' }).then(response => {
            if (response.res.headers['content-type'].indexOf('application/json') > -1) {
                return JSON.parse(response.data.toString())
            } else {
                return response
            }
        })

        if (!pbResource.res && !pbResource.status) {
            if (pbResource.ret === 2 && (pbResource.errcode === 30 || pbResource.errcode === 28)) {
                console.log(pbResource.ret, pbResource.errcode)
                ctx.redirect(`https://www.freelog.com/pages/user/login.html?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`)
            }
            ctx.body = ctx.helper.nodeTemplateHelper.convertErrorNodePageBuild(this.config.nodeTemplate, nodeInfo, userId, pbResource)
            return
        }

        const widgetRelevancePresentables =
            await ctx.curlIntranetApi(`${this.config.gatewayUrl}/api/v1/presentables/pageBuildAssociateWidgetPresentable?presentableId=${pageBuild.presentableId}`)

        ctx.body = ctx.helper.nodeTemplateHelper.convertNodePageBuild(this.config.nodeTemplate, pbResource.data.toString(), nodeInfo, userId, widgetRelevancePresentables)
    }
}



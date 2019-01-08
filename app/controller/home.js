'use strict';

const Controller = require('egg').Controller;

module.exports = class HomeController extends Controller {

    /**
     * 节点主页渲染
     * @param ctx
     * @returns {Promise<void>}
     */
    async nodeHomeIndex(ctx) {

        const nodeInfo = ctx.request.nodeInfo
        const userId = ctx.request.userId || 0

        const presentableAuthUrl = `${ctx.webApi.authInfo}/presentable/${nodeInfo.pageBuildId}.data?nodeId=${nodeInfo.nodeId}`
        await ctx.curlIntranetApi(presentableAuthUrl, {dataType: 'original'}).then(response => {

            const [contentTypeKey, authTokenKey, subResourceIdsKey] = this._findKeyIgnoreUpperLower(response.res.headers, "content-type", "freelog-sub-resource-auth-token", "freelog-sub-resourceIds")
            if (response.res.headers[contentTypeKey].includes('application/json')) {
                this._pageBuildAuthFailedHandle(JSON.parse(response.data.toString()), nodeInfo, userId)
                return
            }
            
            const widgetToken = response.res.headers[authTokenKey]
            const subResourceIds = response.res.headers[subResourceIdsKey]
            ctx.body = ctx.helper.nodeTemplateHelper.convertNodePageBuild(ctx.config.nodeTemplate, response.data.toString(), nodeInfo, userId, widgetToken, subResourceIds)
        })
    }

    /**
     * pb资源授权错误处理
     * @param responseData
     * @param nodeInfo
     * @param userId
     * @private
     */
    _pageBuildAuthFailedHandle(responseData, nodeInfo, userId) {

        const {ctx, config} = this
        if (responseData.errcode === 30 || responseData.errcode === 28) {
            ctx.redirect(`https://www.freelog.com/pages/user/login.html?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`)
        }
        ctx.body = ctx.helper.nodeTemplateHelper.convertErrorNodePageBuild(config.nodeTemplate, nodeInfo, userId, responseData)
    }

    /**
     * 忽略大小写查找对象的key,返回第一个
     * @private
     */
    _findKeyIgnoreUpperLower(object, ...args) {
        const keys = Object.keys(object)
        const result = args.map(key => keys.find(x => x.toLowerCase() === key.toLowerCase()))
        return args.length === 1 ? result[0] : result
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
        }).then(() => ctx.success('模板更新成功'))
    }
}



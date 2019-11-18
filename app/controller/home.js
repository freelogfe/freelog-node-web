'use strict';

const Controller = require('egg').Controller;
const {LoginUser} = require('egg-freelog-base/app/enum/identity-type')

module.exports = class HomeController extends Controller {

    /**
     * 节点主页渲染
     * @param ctx
     * @returns {Promise<void>}
     */
    async index(ctx) {
        if (ctx.request.isTestNode) {
            await this.testNodeHomeIndex(ctx)
        } else {
            await this.nodeHomeIndex(ctx)
        }
    }

    /**
     * 正式节点主页渲染
     * @param ctx
     * @returns {Promise<void>}
     */
    async nodeHomeIndex(ctx) {

        const {userId = 0, nodeInfo} = ctx.request
        const presentableAuthUrl = `${ctx.webApi.authInfo}/presentables/${nodeInfo.pageBuildId}`

        //后期考虑直接把pb文件内容缓存起来,授权时只要授权结果,不拿源文件或者在授权服务里做缓存处理
        const body = await ctx.curlIntranetApi(presentableAuthUrl, {dataType: 'original'}).then(response => {
            const [contentType, subReleases] = this._findValueByKeyIgnoreUpperLower(response.res.headers, "content-type", "freelog-sub-releases")
            if (contentType.includes('application/json')) {
                return this._pageBuildAuthFailedHandle(JSON.parse(response.data.toString()), nodeInfo, userId)
            }
            return ctx.helper.convertNodePageBuild(ctx.config.nodeTemplate, response.data.toString(), nodeInfo, userId, subReleases)
        }).catch(ctx.error)

        ctx.body = body
    }

    /**
     * 测试节点主页渲染
     * @param ctx
     * @returns {Promise<void>}
     */
    async testNodeHomeIndex(ctx) {

        const {userId = 0, nodeInfo} = ctx.request

        if (userId === 0) {
            let webSite = ctx.env === 'test' ? 'freelog' : 'testFreelog'
            ctx.redirect(`https://www.${webSite}.com/login?redirect=http%3A%2F%2F${ctx.host}%2F`)
            return
        }
        if (nodeInfo["ownerUserId"] !== userId) {
            ctx.body = '未获得授权,测试节点访问拒绝'
            return
        }

        const body = await ctx.curlIntranetApi(`${ctx.webApi.authInfo}/testResources/${nodeInfo.pageBuildId}`, {dataType: 'original'}).then(response => {
            const [contentType, subReleases] = this._findValueByKeyIgnoreUpperLower(response.res.headers, "content-type", "freelog-sub-dependencies")
            if (contentType.includes('application/json')) {
                return this._pageBuildAuthFailedHandle(JSON.parse(response.data.toString()), nodeInfo, userId)
            }
            return ctx.helper.convertTestNodePageBuild(ctx.config.nodeTemplate, response.data.toString(), nodeInfo, userId, subReleases)
        })

        ctx.body = body
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
        if ([28, 30].includes(responseData.errcode) || responseData.errcode === 3 && responseData.data.authCode === 505) {
            ctx.redirect(`http://www.freelog.com/pages/user/login.html?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`)
        }
        return ctx.helper.convertErrorNodePageBuild(config.nodeTemplate, nodeInfo, userId, responseData)
    }

    /**
     * 忽略大小写查找对象的key,返回第一个
     * @private
     */
    _findValueByKeyIgnoreUpperLower(object, ...args) {

        const keys = Object.keys(object)
        const result = args.map(key => {
            const realKey = keys.find(x => x.toLowerCase() === key.toLowerCase())
            return object[realKey]
        })
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



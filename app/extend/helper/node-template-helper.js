/**
 * Created by yuliang on 2017/11/2.
 */

'use strict'

const cheerio = require('cheerio')
const cryptoHelper = require('egg-freelog-base/app/extend/helper/crypto_helper')
const {validator} = require('egg-freelog-base/app/extend/application')

module.exports = {

    /**
     * 组合节点的pb HTML内容
     * @param template 模本内容
     * @param pageBuildStr PB文件
     */
    async convertNodePageBuild(template, pageBuildStr, nodeInfo, userId, subReleases) {

        const $ = cheerio.load(template)
        const {nodeId, nodeName, pageBuildId} = nodeInfo

        $('#js-page-container').append(pageBuildStr)
        //$(`[data-widget-src]`).attr('data-page-build-id', pageBuildId)

        let pageBuildSubReleases = []
        if (subReleases && validator.isBase64(subReleases)) {
            try {
                pageBuildSubReleases = JSON.parse(cryptoHelper.base64Decode(subReleases)).map(item => {
                    return {releaseId: item.id, releaseName: item.n, version: item.v}
                })
                if (pageBuildSubReleases.length) {
                    const releaseMap = await this.ctx.curlIntranetApi(`${this.ctx.webApi.releaseInfo}/list?releaseIds=${pageBuildSubReleases.map(x => x.releaseId).toString()}&projection=resourceType`)
                        .then(list => new Map(list.map(x => [x.releaseId, x.resourceType])))
                    pageBuildSubReleases.forEach(item => {
                        item.resourceType = releaseMap.get(item.releaseId)
                    })
                }
            } catch (e) {
                console.log('subReleases解析错误', e, subReleases)
            }
        }

        const authInfo = {
            __auth_user_id__: userId,
            __auth_node_id__: nodeId,
            __auth_node_name__: nodeName,
            __page_build_id: pageBuildId,
            __page_build_sub_releases: pageBuildSubReleases
        }

        $('head').prepend(`<title>${nodeName}-飞致节点</title>`)
        $('head').append(`<script> window.__auth_info__ = ${ JSON.stringify(authInfo) } </script>`)
        $('body').append(`<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1276322399'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/z_stat.php%3Fid%3D1276322399%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>`)

        return $.html()
    },

    test(){
        console.log(this.ctx)
    },

    /**
     * 组合节点的pb HTML内容
     * @param template
     * @param authErrorInfo
     */
    convertErrorNodePageBuild(template, nodeInfo, userId, authErrorInfo) {

        const $ = cheerio.load(template)

        const {nodeId, nodeName} = nodeInfo

        const authInfo = {
            __auth_error_info__: authErrorInfo,
            __auth_user_id__: userId,
            __auth_node_id__: nodeId
        }

        $('head').prepend(`<title>${nodeName}-飞致节点</title>`)
        $('head').append(`<script> window.__auth_info__ = ${ JSON.stringify(authInfo) } </script>`)

        return $.html()
    }
}
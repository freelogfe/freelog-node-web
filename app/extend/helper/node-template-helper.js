/**
 * Created by yuliang on 2017/11/2.
 */

'use strict'

const cheerio = require('cheerio')

module.exports = {

    /**
     * 组合节点的pb HTML内容
     * @param template 模本内容
     * @param pageBuildStr PB文件
     */
    convertNodePageBuild(template, pageBuildStr, nodeInfo, userId, presentableId) {

        const $ = cheerio.load(template)

        $('#js-page-container').append(pageBuildStr)

        $(`[data-widget-src]`).attr('data-widget-presentable-id', presentableId)

        const authInfo = {
            __auth_user_id__: userId,
            __auth_node_id__: nodeInfo.nodeId
        }

        $('head').prepend(`<title>${nodeInfo.nodeName}-飞致节点</title>`)
        $('head').append(`<script> window.__auth_info__ = ${ JSON.stringify(authInfo) } </script>`)

        return $.html()
    },

    /**
     * 组合节点的pb HTML内容
     * @param template
     * @param authErrorInfo
     */
    convertErrorNodePageBuild(template, nodeInfo, userId, authErrorInfo) {

        let $ = cheerio.load(template)

        let authInfo = {
            __auth_error_info__: authErrorInfo,
            __auth_user_id__: userId,
            __auth_node_id__: nodeInfo.nodeId
        }

        $('head').prepend(`<title>${nodeInfo.nodeName}-飞致节点</title>`)
        $('head').append(`<script> window.__auth_info__ = ${ JSON.stringify(authInfo) } </script>`)

        return $.html()
    }
}
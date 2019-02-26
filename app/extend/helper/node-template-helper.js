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
    convertNodePageBuild(template, pageBuildStr, nodeInfo, userId, widgetToken, subResourceIds) {

        const $ = cheerio.load(template)

        $('#js-page-container').append(pageBuildStr)
        $(`[data-widget-src]`).attr('data-widget-token', widgetToken)

        const authInfo = {
            __auth_user_id__: userId,
            __auth_node_id__: nodeInfo.nodeId,
            __auth_node_name__: nodeInfo.nodeName,
            __page_build_sub_resource_ids: subResourceIds ? subResourceIds.split(',') : [],
            __page_build_sub_resource_auth_token: widgetToken
        }

        $('head').prepend(`<title>${nodeInfo.nodeName}-飞致节点</title>`)
        $('head').append(`<script> window.__auth_info__ = ${ JSON.stringify(authInfo) } </script>`)
        $('body').append(`<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1276322399'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/z_stat.php%3Fid%3D1276322399%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>`)

        return $.html()
    },

    /**
     * 组合节点的pb HTML内容
     * @param template
     * @param authErrorInfo
     */
    convertErrorNodePageBuild(template, nodeInfo, userId, authErrorInfo) {

        const $ = cheerio.load(template)

        const authInfo = {
            __auth_error_info__: authErrorInfo,
            __auth_user_id__: userId,
            __auth_node_id__: nodeInfo.nodeId
        }

        $('head').prepend(`<title>${nodeInfo.nodeName}-飞致节点</title>`)
        $('head').append(`<script> window.__auth_info__ = ${ JSON.stringify(authInfo) } </script>`)

        return $.html()
    }
}
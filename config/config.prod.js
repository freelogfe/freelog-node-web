'use strict'

module.exports = {

    /**
     * DB-mysql相关配置
     */
    knex: {
        node: {
            connection: {
                host: '172.18.215.231',
                user: 'root',
                password: 'Ff@233109',
                database: 'fr_node'
            },
            debug: false
        }
    },

    gatewayUrl: "http://172.18.215.224:8895",

    nodeHomePageTemplateUrl: "http://frcdn.oss-cn-shenzhen.aliyuncs.com/pages/pagebuild.html"
}
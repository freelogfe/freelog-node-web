'use strict'

module.exports = {
    /**
     * DB-mysql相关配置
     */
    knex: {
        node: {
            connection: {
                host: 'rm-wz93t7g809kthrub7.mysql.rds.aliyuncs.com',
                user: 'freelog_test',
                password: 'Ff@233109',
                database: 'fr_node'
            },
            debug: false
        }
    },

    /**
     * api网关内网地址
     */
    gatewayUrl: "http://172.18.215.224:8895",


    nodeHomePageTemplateUrl: "http://frcdn.oss-cn-shenzhen.aliyuncs.com/web-components/index.html"
}
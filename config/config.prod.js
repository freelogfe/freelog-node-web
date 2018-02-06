'use strict'

module.exports = appInfo => {
    return {
        /**
         * DB-mysql相关配置
         */
        knex: {
            node: {
                connection: {
                    host: 'rm-wz9wj9435a0428942.mysql.rds.aliyuncs.com',
                    user: 'freelog',
                    password: 'Ff@233109',
                    database: 'fr_node'
                },
                debug: false
            }
        },

        /**
         * api网关内网地址
         */
        //gatewayUrl: "http://172.18.215.224:8895",

        nodeHomePageTemplateUrl: "http://frcdn.oss-cn-shenzhen.aliyuncs.com/web-components/index.html"
    }
}
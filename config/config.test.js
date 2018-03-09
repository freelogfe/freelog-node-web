'use strict'

module.exports = {

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

    gatewayUrl: "http://172.18.215.224:8895/test",

    nodeHomePageTemplateUrl: "http://test-frcdn.oss-cn-shenzhen.aliyuncs.com/pagebuild/index.html"
}
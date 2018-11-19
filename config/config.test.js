'use strict'

module.exports = {

    cluster: {
        listen: {port: 5777}
    },

    knex: {
        node: {
            connection: {
                host: '172.18.215.231',
                user: 'root',
                port: 3307,
                password: 'Ff@233109',
                database: 'fr_node'
            },
            debug: false
        }
    },

    gatewayUrl: "http://172.18.215.224:8895/test",

    nodeHomePageTemplateUrl: "http://test-frcdn.oss-cn-shenzhen.aliyuncs.com/pages/pagebuild.html"
}
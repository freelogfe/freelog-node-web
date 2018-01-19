'use strict';

module.exports = appInfo => {
    const config = {};

    //cookie加密与解密key
    config.keys = 'd5dd9d6d5d9aa0f36c00b779fa7e3cf4,6a40eb7a1d7d01d508af102a151ab56f' //cookie加密与解密key

    // add your config here
    config.middleware = ['nodeDomainAuth', 'identityCookieAuthentication'];

    /**
     * DB-mysql相关配置
     */
    config.dbConfig = {
        node: {
            client: 'mysql2',
            connection: {
                host: '192.168.0.99',
                user: 'root',
                password: 'yuliang@@',
                database: 'fr_node',
                charset: 'utf8',
                timezone: '+08:00',
                bigNumberStrings: true,
                supportBigNumbers: true,
                connectTimeout: 10000
            },
            pool: {
                maxConnections: 50,
                minConnections: 1,
            },
            acquireConnectionTimeout: 10000,
            debug: false
        },
    }

    /**
     * API网关地址
     */
    config.gatewayUrl = "http://api.freelog.com"

    /**
     * 节点主页模板(来源于OSS)
     * @type {null}
     */
    config.nodeTemplate = null

    /**
     * 节点首页模板文件地址
     */
    config.nodeHomePageTemplateUrl = "http://static.freelog.com/web-components/index.html"

    return config;
};

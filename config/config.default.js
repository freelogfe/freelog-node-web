'use strict';

const fs = require('fs')

module.exports = appInfo => {

    const config = {};

    config.cluster = {
        listen: {port: 7777}
    }

    //cookie加密与解密key
    config.keys = 'd5dd9d6d5d9aa0f36c00b779fa7e3cf4,6a40eb7a1d7d01d508af102a151ab56f' //cookie加密与解密key

    // add your config here
    config.middleware = ['identityCookieAuthentication', 'nodeDomainAuth'];

    /**
     * 节点主页模板(来源于OSS)
     * @type {null}
     */
    config.nodeTemplate = null

    /**
     * 节点首页模板文件地址
     */
    config.nodeHomePageTemplateUrl = "http://frcdn.oss-cn-shenzhen.aliyuncs.com/pagebuild/index.html"

    config.alinode = {
        enable: true,
        appid: 2675,
        secret: '477c60068500a2b8e9fa3b5619fdfb58689ea20e',
    };

    config.jwtAuth = {
        cookieName: 'nodeInfo',
        privateKey: fs.readFileSync('config/auth_key/private_key.pem').toString(),
        publicKey: fs.readFileSync('config/auth_key/public_key.pem').toString()
    };

    config.clientCredentialInfo = {
        clientId: 1004,
        publicKey: 'c8724fd977542b155abac77664093770',
        privateKey: 'e8739ff716660a4c942724d306216612'
    };

    return config;
};

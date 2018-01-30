'use strict'

/**
 * 本地开发配置.会与config.default进行合并
 * @param appInfo
 * @returns {{middleware: [string]}}
 */

module.exports = appInfo => {

    return {

        middleware: ['nodeDomainAuth', 'identityCookieAuthentication'],

        mongoose: {
            url: "mongodb://192.168.0.99:27017/auth"
        },

        // knex: {
        //     node: {
        //         client: 'mysql2',
        //         connection: {
        //             host: '192.168.0.99',
        //             user: 'root',
        //             password: 'yuliang@@',
        //             database: 'fr_node',
        //             charset: 'utf8',
        //             timezone: '+08:00',
        //             bigNumberStrings: true,
        //             supportBigNumbers: true,
        //             connectTimeout: 10000
        //         },
        //         pool: {
        //             maxConnections: 50,
        //             minConnections: 1,
        //         },
        //         acquireConnectionTimeout: 10000,
        //         debug: false
        //     },
        // }
        // /**
        //  * 本地开发环境身份信息
        //  */
        // localIdentity: {
        //     userId: 10026,
        //     userName: "余亮",
        //     nickname: "烟雨落叶",
        //     email: "4896819@qq.com",
        //     mobile: "",
        //     tokenSn: "86cd7c43844140f2a4101b441537728f",
        //     userRol: 1,
        //     status: 1,
        //     createDate: "2017-10-20T16:38:17.000Z",
        //     updateDate: "2017-11-01T15:53:29.000Z",
        //     tokenType: "local"
        // }
    }
}
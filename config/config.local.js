'use strict'

/**
 * 本地开发配置.会与config.default进行合并
 * @param appInfo
 * @returns {{middleware: [string]}}
 */

module.exports = appInfo => {

    return {
        /**
         * DB-mysql相关配置
         */
        knex: {
            node: {
                connection: {
                    host: 'rm-wz9wj9435a04289421o.mysql.rds.aliyuncs.com',
                    user: 'freelog',
                    password: 'Ff@233109',
                    database: 'fr_node'
                },
                debug: false
            }
        },

        gatewayUrl: "https://api.freelog.com",

        nodeHomePageTemplateUrl: "http://frcdn.oss-cn-shenzhen.aliyuncs.com/pagebuild/index.html",

    }
    //
    // return {
    //
    //     middleware: ['nodeDomainAuth', 'identityCookieAuthentication'],
    //
    //     // knex: {
    //     //     node: {
    //     //         client: 'mysql2',
    //     //         connection: {
    //     //             host: '192.168.0.99',
    //     //             user: 'root',
    //     //             password: 'yuliang@@',
    //     //             database: 'fr_node',
    //     //             charset: 'utf8',
    //     //             timezone: '+08:00',
    //     //             bigNumberStrings: true,
    //     //             supportBigNumbers: true,
    //     //             connectTimeout: 10000
    //     //         },
    //     //         pool: {
    //     //             maxConnections: 50,
    //     //             minConnections: 1,
    //     //         },
    //     //         acquireConnectionTimeout: 10000,
    //     //         debug: false
    //     //     },
    //     // }
    //     // /**
    //     //  * 本地开发环境身份信息
    //     //  */
    //     // localIdentity: {
    //     //     userId: 10026,
    //     //     userName: "余亮",
    //     //     nickname: "烟雨落叶",
    //     //     email: "4896819@qq.com",
    //     //     mobile: "",
    //     //     tokenSn: "86cd7c43844140f2a4101b441537728f",
    //     //     userRol: 1,
    //     //     status: 1,
    //     //     createDate: "2017-10-20T16:38:17.000Z",
    //     //     updateDate: "2017-11-01T15:53:29.000Z",
    //     //     tokenType: "local"
    //     // }
    // }
}
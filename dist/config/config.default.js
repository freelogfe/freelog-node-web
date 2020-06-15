"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
exports.default = (app) => {
    const config = {};
    //cookie加密与解密key
    config.keys = 'd5dd9d6d5d9aa0f36c00b779fa7e3cf4,6a40eb7a1d7d01d508af102a151ab56f'; //cookie加密与解密key
    // add your config here
    config.middleware = ['identityCookieAuthentication', 'nodeDomainAuth'];
    config.nodeDomainAuth = {
        enable: true,
        ignore: [(ctx) => ctx.path.startsWith("/home/triggerUpdateNodeTemplateEvent")]
    };
    config.cluster = {
        listen: { port: 5777 }
    };
    config.view = {
        defaultViewEngine: 'nunjucks',
    };
    config.nunjucks = {
        autoescape: true,
        throwOnUndefined: false,
        trimBlocks: false,
        lstripBlocks: false,
        cache: true,
    };
    config.alinode = {
        enable: true,
        appid: 2675,
        secret: '477c60068500a2b8e9fa3b5619fdfb58689ea20e',
    };
    config.jwtAuth = {
        cookieName: 'nodeInfo',
        privateKey: fs.readFileSync(path.join(app.baseDir, '../auth_key/private_key.pem')).toString(),
        publicKey: fs.readFileSync(path.join(app.baseDir, '../auth_key/public_key.pem')).toString()
    };
    config.clientCredentialInfo = {
        clientId: 1004,
        publicKey: 'c8724fd977542b155abac77664093770',
        privateKey: 'e8739ff716660a4c942724d306216612'
    };
    config.cors = {
        credentials: true,
        origin(ctx) {
            const origin = /(test)?freelog\.com\/?$/.test(ctx.request.headers.origin) ? ctx.request.headers.origin : '*';
            return origin;
        },
    };
    /**
     * 节点主页模板(来源于OSS)
     */
    config.nodePageTpl = {
        // 节点首页模板文件地址
        url: 'http://frcdn.oss-cn-shenzhen.aliyuncs.com/pagebuild/index.html',
    };
    // config.customFileLoader = ['app/event-handler/app-events-listener.js']
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUk3QixrQkFBZSxDQUFDLEdBQWUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLEVBQW1CLENBQUE7SUFFbEMsZ0JBQWdCO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUVBQW1FLENBQUEsQ0FBQyxnQkFBZ0I7SUFFbEcsdUJBQXVCO0lBQ3ZCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBRSw4QkFBOEIsRUFBRSxnQkFBZ0IsQ0FBRSxDQUFBO0lBRXhFLE1BQU0sQ0FBQyxjQUFjLEdBQUc7UUFDeEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsQ0FBRSxDQUFDLEdBQVksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsc0NBQXNDLENBQUMsQ0FBRTtLQUN6RixDQUFBO0lBRUEsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7S0FDdkIsQ0FBQTtJQUVELE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixpQkFBaUIsRUFBRSxVQUFVO0tBQzlCLENBQUE7SUFFRCxNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2hCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGdCQUFnQixFQUFFLEtBQUs7UUFDdkIsVUFBVSxFQUFFLEtBQUs7UUFDakIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFBO0lBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNiLE1BQU0sRUFBRSxJQUFJO1FBQ1osS0FBSyxFQUFFLElBQUk7UUFDWCxNQUFNLEVBQUUsMENBQTBDO0tBQ3JELENBQUE7SUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHO1FBQ2YsVUFBVSxFQUFFLFVBQVU7UUFDdEIsVUFBVSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDN0YsU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDNUYsQ0FBQTtJQUVELE1BQU0sQ0FBQyxvQkFBb0IsR0FBRztRQUM1QixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxrQ0FBa0M7UUFDN0MsVUFBVSxFQUFFLGtDQUFrQztLQUMvQyxDQUFBO0lBRUQsTUFBTSxDQUFDLElBQUksR0FBRztRQUNaLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE1BQU0sQ0FBQyxHQUFZO1lBQ2pCLE1BQU0sTUFBTSxHQUFHLHlCQUF5QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7WUFDNUcsT0FBTyxNQUFNLENBQUE7UUFDZixDQUFDO0tBQ0YsQ0FBQTtJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsR0FBRztRQUNuQixhQUFhO1FBQ2IsR0FBRyxFQUFFLGdFQUFnRTtLQUN0RSxDQUFBO0lBRUQseUVBQXlFO0lBRXpFLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=
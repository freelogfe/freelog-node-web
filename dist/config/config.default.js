"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
exports.default = (app) => {
    const config = {};
    //cookie加密与解密key
    config.keys = 'd5dd9d6d5d9aa0f36c00b779fa7e3cf4,6a40eb7a1d7d01d508af102a151ab56f'; //cookie加密与解密key
    // add your config here
    config.middleware = ['errorAutoSnapHandler', 'localIdentityInfoHandler', 'nodeDomainAuth'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUs3QixrQkFBZSxDQUFDLEdBQWUsRUFBRSxFQUFFO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLEVBQW1CLENBQUE7SUFFbEMsZ0JBQWdCO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbUVBQW1FLENBQUEsQ0FBQyxnQkFBZ0I7SUFFbEcsdUJBQXVCO0lBQ3ZCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBRSxzQkFBc0IsRUFBQywwQkFBMEIsRUFBRSxnQkFBZ0IsQ0FBRSxDQUFBO0lBRzNGLE1BQU0sQ0FBQyxjQUFjLEdBQUc7UUFDeEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsQ0FBRSxDQUFDLEdBQW1CLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNDQUFzQyxDQUFDLENBQUU7S0FDaEcsQ0FBQTtJQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDZixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0tBQ3ZCLENBQUE7SUFFRCxNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1osaUJBQWlCLEVBQUUsVUFBVTtLQUM5QixDQUFBO0lBRUQsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixVQUFVLEVBQUUsSUFBSTtRQUNoQixnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFlBQVksRUFBRSxLQUFLO1FBQ25CLEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQTtJQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDYixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO1FBQ1gsTUFBTSxFQUFFLDBDQUEwQztLQUNyRCxDQUFBO0lBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO1FBQzdGLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0tBQzVGLENBQUE7SUFFRCxNQUFNLENBQUMsb0JBQW9CLEdBQUc7UUFDNUIsUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsa0NBQWtDO1FBQzdDLFVBQVUsRUFBRSxrQ0FBa0M7S0FDakQsQ0FBQztJQUVBLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixXQUFXLEVBQUUsSUFBSTtRQUNqQixNQUFNLENBQUMsR0FBbUI7WUFDeEIsTUFBTSxNQUFNLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtZQUM1RyxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7S0FDRixDQUFBO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsV0FBVyxHQUFHO1FBQ25CLGFBQWE7UUFDYixHQUFHLEVBQUUsZ0VBQWdFO0tBQ3RFLENBQUE7SUFFRCx5RUFBeUU7SUFFekUsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==
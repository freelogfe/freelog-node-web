"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
// import baseExtendInstance = require('egg-freelog-base/app/extend/application')
const egg_freelog_base_1 = require("egg-freelog-base");
const midway_1 = require("midway");
let HomeService = class HomeService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    // 正式节点主页渲染
    async renderNodeHomeIndex(nodeInfo) {
        const ctx = this.ctx;
        const { userId: __auth_user_id__ } = ctx.request;
        const { nodeId: __auth_node_id__, nodeName: __auth_node_name__, pageBuildId: __page_build_id } = nodeInfo;
        // 请求主题内容
        const pbAuthUrl = `${ctx.webApi.authInfoV2}/presentables/${__page_build_id}/fileStream`;
        const rResponse = await ctx.curlIntranetApi(pbAuthUrl, {}, egg_freelog_base_1.CurlResFormatEnum.Original);
        // const [contentType, __page_build_sub_releases, __page_build_entity_id] = this.findValueByKeyIgnoreUpperLower(rResponse.res.headers, ['content-type', 'freelog-sub-dependencies', 'freelog-entity-nid'])
        const [__page_build_sub_releases, __page_build_entity_id] = this.findValueByKeyIgnoreUpperLower(rResponse.res.headers, ['freelog-sub-dependencies', 'freelog-entity-nid']);
        const authResString = rResponse.data.toString();
        const title = `${__auth_node_name__}-飞致节点`;
        const keywords = '';
        let description = '';
        let pbFragment = '';
        let authInfoFragment = '';
        // if (contentType.includes('application/json')) {
        //   const authRes = JSON.parse(authResString)
        //   if (authRes.errcode === 3 && authRes.data.authCode === 505) {
        //     authInfoFragment = `<script>window.__auth_info__=${JSON.stringify({
        //       __auth_user_id__,  __auth_node_id__,
        //       __auth_error_info__: Object.assign(authRes.data.authResult, {
        //         'freelog-sub-dependencies': __page_build_sub_releases,
        //         'freelog-entity-nid': __page_build_entity_id
        //       }),
        //     })}</script>`
        //   } else {
        //     authInfoFragment = `<script>window.__auth_info__=${JSON.stringify({
        //       __auth_user_id__,  __auth_node_id__,
        //       __auth_error_info__: authRes.data.authResult,
        //     })}</script>`
        //   }
        // } else {
        pbFragment = authResString;
        authInfoFragment = `<script>window.__auth_info__=${JSON.stringify({
            __auth_user_id__, __auth_node_id__, __auth_node_name__, __page_build_id, __page_build_entity_id,
            __page_build_sub_releases: this.resolveSubReleases(__page_build_sub_releases),
        })}</script>`;
        // }
        // try {
        //   const data = fse.readFileSync(path.join(ctx.app.baseDir, 'app/view/pagebuild.html'));
        //   ctx.cache.nodePageTplContent = data.toString()
        //   // 等待操作结果返回，然后打印结果
        //   console.log(data, 3343434);
        // } catch(e) {
        //   console.log('读取文件发生错误');
        // }
        ctx.body = await ctx.renderString(ctx.cache.nodePageTplContent, {
            title, keywords, description, pbFragment, authInfoFragment,
        }, { viewEngine: 'nunjucks' });
    }
    resolveSubReleases(subReleases) {
        let pageBuildSubReleases = [];
        if (subReleases) {
            try {
                pageBuildSubReleases = JSON.parse(decodeURIComponent(subReleases));
            }
            catch (e) {
                this.ctx.logger.error('subReleases解析错误', e, subReleases);
            }
        }
        return pageBuildSubReleases;
    }
    // 忽略大小写查找对象的key
    findValueByKeyIgnoreUpperLower(object, keys) {
        const map = new Map();
        for (let [key, value] of Object.entries(object)) {
            map.set(key.toLowerCase(), value);
        }
        const result = [];
        for (let key of keys) {
            result.push(map.get(key));
        }
        return result;
    }
};
HomeService = __decorate([
    midway_1.provide(),
    __param(0, midway_1.inject()),
    __metadata("design:paramtypes", [Object])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ob21lL2hvbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLGlGQUFpRjtBQUNqRix1REFBbUU7QUFDbkUsbUNBQXNDO0FBUXRDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFdEIsWUFDb0IsR0FBbUI7UUFBbkIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7SUFFdkMsQ0FBQztJQUVELFdBQVc7SUFDSixLQUFLLENBQUMsbUJBQW1CLENBQUMsUUFBbUI7UUFDbEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNwQixNQUFNLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFDLEdBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUE7UUFDM0QsTUFBTSxFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxHQUFHLFFBQVEsQ0FBQTtRQUN2RyxTQUFTO1FBQ1QsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsaUJBQWlCLGVBQWUsYUFBYSxDQUFBO1FBRXZGLE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLG9DQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRXRGLDBNQUEwTTtRQUMxTSxNQUFNLENBQUMseUJBQXlCLEVBQUUsc0JBQXNCLENBQUMsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUE7UUFDMUssTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUks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
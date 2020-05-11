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
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const baseExtendInstance = require("egg-freelog-base/app/extend/application");
const cryptoHelper = require("egg-freelog-base/app/extend/helper/crypto_helper");
const midway_1 = require("midway");
let HomeService = class HomeService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    // 正式节点主页渲染
    async renderNodeHomeIndex(nodeInfo) {
        const ctx = this.ctx;
        const { userId: __auth_user_id__ } = ctx.request;
        const { nodeId: __auth_node_id__, nodeName: __auth_node_name__, pageBuildId: __page_build_id, isTestNode } = nodeInfo;
        const pbAuthUrl = `${ctx.webApi.authInfo}/${isTestNode ? 'testResources' : 'presentables'}/${__page_build_id}`;
        const rResponse = await ctx.curlIntranetApi(pbAuthUrl, { dataType: 'original' });
        const [contentType, __page_build_sub_releases, __page_build_entity_id] = this.findValueByKeyIgnoreUpperLower(rResponse.res.headers, ['content-type', 'freelog-sub-dependencies', 'freelog-entity-nid']);
        const authResString = rResponse.data.toString();
        const title = `${__auth_node_name__}-飞致节点`;
        const keywords = '';
        let description = '';
        let pbFragment = '';
        let authInfoFragment = '';
        if (contentType.includes('application/json')) {
            const authRes = JSON.parse(authResString);
            if (authRes.errcode === 3 && authRes.data.authCode === 505) {
                authInfoFragment = `<script>window.__auth_info__=${JSON.stringify({
                    __auth_user_id__, __auth_node_id__,
                    __auth_error_info__: Object.assign(authRes.data.authResult, {
                        'freelog-sub-dependencies': __page_build_sub_releases,
                        'freelog-entity-nid': __page_build_entity_id
                    }),
                })}</script>`;
            }
            else {
                authInfoFragment = `<script>window.__auth_info__=${JSON.stringify({
                    __auth_user_id__, __auth_node_id__,
                    __auth_error_info__: authRes.data.authResult,
                })}</script>`;
            }
        }
        else {
            pbFragment = authResString;
            authInfoFragment = `<script>window.__auth_info__=${JSON.stringify({
                __auth_user_id__, __auth_node_id__, __auth_node_name__, __page_build_id, __page_build_entity_id,
                __page_build_sub_releases: this.resolveSubReleases(__page_build_sub_releases),
            })}</script>`;
        }
        ctx.body = await ctx.renderString(ctx.cache.nodePageTplContent, {
            title, keywords, description, pbFragment, authInfoFragment,
        }, { viewEngine: 'nunjucks' });
    }
    resolveSubReleases(subReleases) {
        let pageBuildSubReleases = [];
        if (subReleases && baseExtendInstance.validator.isBase64(subReleases)) {
            try {
                pageBuildSubReleases = JSON.parse(cryptoHelper.base64Decode(subReleases));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ob21lL2hvbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLHdDQUF3QztBQUN4QywyQ0FBMkM7QUFDM0MsOEVBQThFO0FBQzlFLGlGQUFpRjtBQUNqRixtQ0FBaUQ7QUFNakQsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUV0QixZQUNvQixHQUFZO1FBQVosUUFBRyxHQUFILEdBQUcsQ0FBUztJQUM3QixDQUFDO0lBRUosV0FBVztJQUNMLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxRQUFtQjtRQUNqRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ3BCLE1BQU0sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsR0FBZ0IsR0FBRyxDQUFDLE9BQU8sQ0FBQTtRQUM3RCxNQUFNLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxHQUFHLFFBQVEsQ0FBQTtRQUNySCxNQUFNLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksZUFBZSxFQUFFLENBQUE7UUFFOUcsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ2hGLE1BQU0sQ0FBRSxXQUFXLEVBQUcseUJBQXlCLEVBQUcsc0JBQXNCLENBQUUsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBRSxjQUFjLEVBQUUsMEJBQTBCLEVBQUUsb0JBQW9CLENB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
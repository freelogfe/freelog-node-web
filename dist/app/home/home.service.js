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
        console.log(pbAuthUrl, nodeInfo);
        const rResponse = await ctx.curlIntranetApi(pbAuthUrl, {}, egg_freelog_base_1.CurlResFormatEnum.Original);
        // console.log('request error', rResponse)
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
        /**以下代码用于测试运行时：步骤，1.把运行时js放到pubLic下面，2.pagebuild2.html中引用，3.读取文件 */
        // try {
        //   const data = fse.readFileSync(path.join(ctx.app.baseDir, 'app/view/pagebuild2.html'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ob21lL2hvbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLGlGQUFpRjtBQUNqRix1REFBbUU7QUFDbkUsbUNBQXNDO0FBUXRDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFdEIsWUFDb0IsR0FBbUI7UUFBbkIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7SUFFdkMsQ0FBQztJQUVELFdBQVc7SUFDSixLQUFLLENBQUMsbUJBQW1CLENBQUMsUUFBbUI7UUFDbEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNwQixNQUFNLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFDLEdBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUE7UUFDM0QsTUFBTSxFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxHQUFHLFFBQVEsQ0FBQTtRQUN2RyxTQUFTO1FBQ1QsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsaUJBQWlCLGVBQWUsYUFBYSxDQUFBO1FBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLG9DQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3RGLDBDQUEwQztRQUMxQywwTUFBME07UUFDMU0sTUFBTSxDQUFDLHlCQUF5QixFQUFFLHNCQUFzQixDQUFDLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFBO1FBQzFLLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDL0MsTUFBTSxLQUFLLEdBQUcsR0FBRyxrQkFBa0IsT0FBTyxDQUFBO1FBQzFDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNuQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7UUFDcEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ25CLElBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFBO1FBQ3pCLGtEQUFrRDtRQUNsRCw4Q0FBOEM7UUFDOUMsa0VBQWtFO1FBQ2xFLDBFQUEwRTtRQUMxRSw2Q0FBNkM7UUFDN0Msc0VBQXNFO1FBQ3RFLGlFQUFpRTtRQUNqRSx1REFBdUQ7UUFDdkQsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixhQUFhO1FBQ2IsMEVBQTBFO1FBQzFFLDZDQUE2QztRQUM3QyxzREFBc0Q7UUFDdEQsb0JBQW9CO1FBQ3BCLE1BQU07UUFDTixXQUFXO1FBQ1gsVUFBVSxHQUFHLGFBQWEsQ0FBQTtRQUMxQixnQkFBZ0IsR0FBRyxnQ0FBZ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsc0JBQXNCO1lBQy9GLHlCQUF5QixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsQ0FBQztTQUM5RSxDQUFDLFdBQVcsQ0FBQTtRQUNiLElBQUk7UUFDSixtRUFBbUU7UUFDbkUsUUFBUTtRQUNSLDJGQUEyRjtRQUMzRixtREFBbUQ7UUFDbkQsdUJBQXVCO1FBQ3ZCLGdDQUFnQztRQUNoQyxlQUFlO1FBQ2YsNkJBQTZCO1FBQzdCLElBQUk7UUFFSixHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFO1lBQzlELEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0I7U0FDM0QsRUFBRSxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxXQUFtQjtRQUM1QyxJQUFJLG9CQUFvQixHQUFXLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUk7Z0JBQ0Ysb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO2FBQ25FO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTthQUN6RDtTQUNGO1FBQ0QsT0FBTyxvQkFBb0IsQ0FBQTtJQUM3QixDQUFDO0lBRUQsZ0JBQWdCO0lBQ1IsOEJBQThCLENBQUMsTUFBbUIsRUFBRSxJQUFlO1FBQ3pFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDbEM7UUFDRCxNQUFNLE1BQU0sR0FBYyxFQUFFLENBQUE7UUFDNUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDMUI7UUFDRCxPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUM7Q0FDRixDQUFBO0FBdkZZLFdBQVc7SUFEdkIsZ0JBQU8sRUFBRTtJQUlMLFdBQUEsZUFBTSxFQUFFLENBQUE7O0dBSEEsV0FBVyxDQXVGdkI7QUF2Rlksa0NBQVcifQ==
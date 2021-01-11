// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
// import baseExtendInstance = require('egg-freelog-base/app/extend/application')
import {CurlResFormatEnum, FreelogContext} from 'egg-freelog-base';
import {provide, inject} from 'midway'
// import fse = require('fs-extra')
// import path = require('path')

import {INodeInfo} from './home.model'
import {PlainObject} from '../../interface'

@provide()
export class HomeService {

  constructor(
    @inject() private ctx: FreelogContext
  ) {
  }

  // 正式节点主页渲染
  public async renderNodeHomeIndex(nodeInfo: INodeInfo): Promise<void> {
    const ctx = this.ctx
    const {userId: __auth_user_id__}: PlainObject = ctx.request
    const {nodeId: __auth_node_id__, nodeName: __auth_node_name__, pageBuildId: __page_build_id} = nodeInfo
    // 请求主题内容
    const pbAuthUrl = `${ctx.webApi.authInfoV2}/presentables/${__page_build_id}/fileStream`

    const rResponse = await ctx.curlIntranetApi(pbAuthUrl, {}, CurlResFormatEnum.Original)
    console.log('request error', rResponse)
    // const [contentType, __page_build_sub_releases, __page_build_entity_id] = this.findValueByKeyIgnoreUpperLower(rResponse.res.headers, ['content-type', 'freelog-sub-dependencies', 'freelog-entity-nid'])
    const [__page_build_sub_releases, __page_build_entity_id] = this.findValueByKeyIgnoreUpperLower(rResponse.res.headers, ['freelog-sub-dependencies', 'freelog-entity-nid'])
    const authResString = rResponse.data.toString()
    const title = `${__auth_node_name__}-飞致节点`
    const keywords = ''
    let description = ''
    let pbFragment = ''
    let authInfoFragment = ''
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
    pbFragment = authResString
    authInfoFragment = `<script>window.__auth_info__=${JSON.stringify({
      __auth_user_id__, __auth_node_id__, __auth_node_name__, __page_build_id, __page_build_entity_id,
      __page_build_sub_releases: this.resolveSubReleases(__page_build_sub_releases),
    })}</script>`
    // }
    // try {
    //   const data = fse.readFileSync(path.join(ctx.app.baseDir, 'app/view/pagebuild.html'));
    //   ctx.cache.nodePageTplContent = data.toString()
    //   // 等待操作结果返回，然后打印结果
    //   console.log(data, 3343434);
    // } catch(e) {
    //   console.log('读取文件发生错误');
    // }
    console.log(rResponse.data,pbFragment, pbAuthUrl)

    ctx.body = await ctx.renderString(ctx.cache.nodePageTplContent, {
      title, keywords, description, pbFragment, authInfoFragment,
    }, {viewEngine: 'nunjucks'})
  }

  private resolveSubReleases(subReleases: string): any [] {
    let pageBuildSubReleases: any [] = []
    if (subReleases) {
      try {
        pageBuildSubReleases = JSON.parse(decodeURIComponent(subReleases))
      } catch (e) {
        this.ctx.logger.error('subReleases解析错误', e, subReleases)
      }
    }
    return pageBuildSubReleases
  }

  // 忽略大小写查找对象的key
  private findValueByKeyIgnoreUpperLower(object: PlainObject, keys: string []): string [] {
    const map = new Map()
    for (let [key, value] of Object.entries(object)) {
      map.set(key.toLowerCase(), value)
    }
    const result: string [] = []
    for (let key of keys) {
      result.push(map.get(key))
    }
    return result
  }
}

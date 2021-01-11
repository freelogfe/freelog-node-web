// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import { INodeInfo, ITestNodeRuleInfo, IDomainResolveResult } from '../home/home.model'
import { nextDefinition, PlainObject } from '../../interface'
import { FreelogContext } from 'egg-freelog-base'

export default () => {
  return async (ctx: FreelogContext, next: nextDefinition) => {
    try {
      const nodeInfo: IDomainResolveResult = await resolveNodeDomain(ctx)
      const subNodeDomain: string = getSubNodeDomain(ctx.host)
      // const subNodeDomain ="snnaenu";
      const [ title, keywords, description ] = [ '飞致节点', '', '' ]
      if (nodeInfo == null) {
        const message: string = `sorry,${subNodeDomain} is not freelog website`
        await ctx.render('invalid-nodeDomain.html', { title, keywords, description, message })
        return
      } else {
        if (nodeInfo.status === 2) {
          const message: string = `sorry,${subNodeDomain} is not freelog website`
          await ctx.render('invalid-nodeDomain.html', { title, keywords, description, message })
          return
        }
        if (nodeInfo.pageBuildId === '') {
          const message: string = `${nodeInfo.isTestNode ? '测试节点' : '节点'}异常，错误代码：未添加主题或主题未激活`
          await ctx.render('no-pagebuild.html', { title, keywords, description, message })
          return
        }
        if (nodeInfo.isTestNode) {
          const { userId }: PlainObject = ctx.request
          if (nodeInfo.ownerUserId !== userId) {
            const message: string = '未获得授权，测试节点访问拒绝'
            await ctx.render('auth-error.html', { title, keywords, description, message })
            return
          }
        }
        ctx.generateNodeJwtInfo(nodeInfo, ctx.app.config.jwtAuth)
        ctx.nodeInfo = nodeInfo
        await next()
      }
    } catch(e) {
      ctx.logger.info(e)
      ctx.body = e
    }

  }

  async function resolveNodeDomain(ctx: FreelogContext): Promise<IDomainResolveResult> {
    let subNodeDomain: string = ctx.host.split('.')[0]
    const regexNodeDomain = new RegExp(/^(?!-)[a-z0-9-]{4,24}(?<!-)$/)
    if (!regexNodeDomain.test(subNodeDomain)) {
      // TODO 提交代码前注释打开
      return null
    }
    // subNodeDomain ="snnaenu";
    const nodeInfo: INodeInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfoV2}/detail?nodeDomain=${subNodeDomain}`,{})
    if (/^t\./.test(ctx.host)) {
      const testNodeRuleInfo: ITestNodeRuleInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfoV2}/detail?nodeDomain=${subNodeDomain}`)
      nodeInfo.isTestNode = true
      nodeInfo.pageBuildId = testNodeRuleInfo ? testNodeRuleInfo.themeId : ""
    }
    return nodeInfo
  }

  function getSubNodeDomain(host: string): string {
     return host.replace(/(\.freelog\.com|\.testfreelog\.com)/i, '').replace(/^t\./, '')
  }
} 

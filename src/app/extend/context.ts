// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import uuid = require('uuid')
import { INodeInfo } from "../home/home.model"
import { IJwtAuth, ICache } from '../../interface'
import { FreelogContext, JwtHelper } from 'egg-freelog-base'

export interface NewApi {
  freelog:  string
  testfreelog: string
}
export interface IExtendedCtx extends FreelogContext {
  nodeInfo: INodeInfo | null
  cache: ICache
  generateNodeJwtInfo(jwtAuth: IJwtAuth): void
  redictLoginPage(): void
  newApi:  NewApi
}

export default {
  nodeInfo: null,
  cache: {
    nodePageTplContent: ''
  },
  generateNodeJwtInfo(jwtAuth: IJwtAuth): void {
    const { nodeInfo, cookies } = this
    if (nodeInfo == null) return
    const currTime = Math.round(new Date().getTime() / 1000)
    const { publicKey, privateKey, cookieName } = jwtAuth

    const payLoad = Object.assign({}, {
        iss: `https://${nodeInfo.nodeDomain}.freelog.com`,
        sub: nodeInfo.nodeId.toString(),
        aud: "freelog-website",
        exp: currTime + 1296000,
        iat: currTime,
        jti: uuid.v4().replace(/-/g, ''),
    }, nodeInfo)

    const jwtStr: string = new JwtHelper(publicKey, privateKey).generateToken(payLoad, 1296000)
    cookies.set(cookieName, jwtStr, {
      overwrite: true,
      signed: false
    })
  },
  redictLoginPage() {
    const ctx = this.ctx
    ctx.logger.info('login')
    const webSite = ctx.env === 'test' ? 'freelog' : 'testFreelog'
		ctx.redirect(`https://www.${webSite}.com/login?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`)
  },
  newApi: {
    freelog: 'http://qi.testfreelog.com/v2',
    testfreelog: ''
  }
} as IExtendedCtx

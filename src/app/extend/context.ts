// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
import jwtHelper = require('egg-freelog-base/app/extend/helper/jwt_helper')
import uuid = require('uuid')
import { INodeInfo } from "../home/home.model"
import { Context } from 'midway'
import { IJwtAuth, ICache } from '../../interface'

export interface IExtendedCtx extends Context {
  nodeInfo: INodeInfo | null
  cache: ICache
  generateNodeJwtInfo(jwtAuth: IJwtAuth): void
  redictLoginPage(): void
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

    const jwtStr: string = new jwtHelper(publicKey, privateKey).createJwt(payLoad, 1296000)
    cookies.set(cookieName, jwtStr, {
      overwrite: true, 
      signed: false
    })
  },
  redictLoginPage() {
    const ctx = this.ctx
    const webSite = ctx.env === 'test' ? 'freelog' : 'testFreelog'
		ctx.redirect(`https://www.${webSite}.com/login?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`)
  }
} as IExtendedCtx
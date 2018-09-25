'use strict'

const uuid = require('uuid')
const jwtHelper = require('egg-freelog-base/app/extend/helper/jwt_helper')

module.exports = {

    /**
     * 生成JWT-节点信息
     */
    generateNodeJwtInfo(nodeInfo) {

        const {cookies, config} = this
        const currTime = Math.round(new Date().getTime() / 1000)
        const {publicKey, privateKey, cookieName} = config.jwtAuth

        const payLoad = Object.assign({}, nodeInfo, {
            iss: `https://${nodeInfo.nodeDomain}.freelog.com`,
            sub: nodeInfo.nodeId.toString(),
            aud: "freelog-website",
            exp: currTime + 1296000,
            iat: currTime,
            jti: uuid.v4().replace(/-/g, ''),
        })

        const jwtStr = new jwtHelper(publicKey, privateKey).createJwt(payLoad, 1296000)
        cookies.set(cookieName, jwtStr, {overwrite: true})
    }
}
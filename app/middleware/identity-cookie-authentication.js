'use strict'

const JwtHelper = require('egg-freelog-base/app/extend/helper/jwt_helper')
const jwtClass = new JwtHelper()

module.exports = (options, app) => async (ctx, next) => {

    let jwtStr = ctx.cookies.get('authInfo')
    if (!jwtStr) {
        jwtStr = getCookie(ctx.headers.cookie || '', 'authInfo')
    }
    if (!jwtStr) {
        let auth = ctx.headers.authorization || ''
        auth.startsWith('Bearer ') && (jwtStr = auth.replace('Bearer ', ''))
    }

    if (!jwtStr) {
        await next()
        return
    }

    jwtClass.publicKey = app.config.jwtAuth.publicKey

    let verifyResult = jwtClass.verifyJwt(jwtStr)
    console.log(verifyResult)
    if (!verifyResult.isVerify) {
        return await next()
    }
    ctx.request.userId = verifyResult.payLoad.userId
    ctx.request.identityInfo = {
        userInfo: verifyResult.payLoad,
        tokenType: 'jwt'
    }

    let userToken = {
        info: verifyResult.payLoad,
        type: 'jwt'
    }

    ctx.headers['auth-token'] = new Buffer(JSON.stringify(userToken)).toString("base64")

    await next()
}

function getCookie(cookie, name) {
    let arr;
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = cookie.match(reg))
        return unescape(arr[2]);
    else
        return null
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const uuid = require("uuid");
const egg_freelog_base_1 = require("egg-freelog-base");
exports.default = {
    nodeInfo: null,
    cache: {
        nodePageTplContent: ''
    },
    generateNodeJwtInfo(jwtAuth) {
        const { nodeInfo, cookies } = this;
        if (nodeInfo == null)
            return;
        const currTime = Math.round(new Date().getTime() / 1000);
        const { publicKey, privateKey, cookieName } = jwtAuth;
        const payLoad = Object.assign({}, {
            iss: `https://${nodeInfo.nodeDomain}.freelog.com`,
            sub: nodeInfo.nodeId.toString(),
            aud: "freelog-website",
            exp: currTime + 1296000,
            iat: currTime,
            jti: uuid.v4().replace(/-/g, ''),
        }, nodeInfo);
        const jwtStr = new egg_freelog_base_1.JwtHelper(publicKey, privateKey).generateToken(payLoad, 1296000);
        cookies.set(cookieName, jwtStr, {
            overwrite: true,
            signed: false
        });
    },
    redictLoginPage() {
        const ctx = this.ctx;
        ctx.logger.info('login');
        const webSite = ctx.env === 'test' ? 'freelog' : 'testFreelog';
        ctx.redirect(`https://www.${webSite}.com/login?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`);
    },
    newApi: {
        freelog: 'http://qi.testfreelog.com/v2',
        testfreelog: ''
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZXh0ZW5kL2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLDZCQUE2QjtBQUc3Qix1REFBNEQ7QUFjNUQsa0JBQWU7SUFDYixRQUFRLEVBQUUsSUFBSTtJQUNkLEtBQUssRUFBRTtRQUNMLGtCQUFrQixFQUFFLEVBQUU7S0FDdkI7SUFDRCxtQkFBbUIsQ0FBQyxPQUFpQjtRQUNuQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNsQyxJQUFJLFFBQVEsSUFBSSxJQUFJO1lBQUUsT0FBTTtRQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDeEQsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFBO1FBRXJELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQzlCLEdBQUcsRUFBRSxXQUFXLFFBQVEsQ0FBQyxVQUFVLGNBQWM7WUFDakQsR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQy9CLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIsR0FBRyxFQUFFLFFBQVEsR0FBRyxPQUFPO1lBQ3ZCLEdBQUcsRUFBRSxRQUFRO1lBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztTQUNuQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRVosTUFBTSxNQUFNLEdBQVcsSUFBSSw0QkFBUyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRTtZQUM5QixTQUFTLEVBQUUsSUFBSTtZQUNmLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELGVBQWU7UUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQTtRQUNoRSxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsT0FBTyx1QkFBdUIsa0JBQWtCLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDdkcsQ0FBQztJQUNELE1BQU0sRUFBRTtRQUNOLE9BQU8sRUFBRSw4QkFBOEI7UUFDdkMsV0FBVyxFQUFFLEVBQUU7S0FDaEI7Q0FDYyxDQUFBIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-reference
/// <reference path="../../globals.d.ts" />
const jwtHelper = require("egg-freelog-base/app/extend/helper/jwt_helper");
const uuid = require("uuid");
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
        const jwtStr = new jwtHelper(publicKey, privateKey).createJwt(payLoad, 1296000);
        cookies.set(cookieName, jwtStr, {
            overwrite: true,
            signed: false
        });
    },
    redictLoginPage() {
        const ctx = this.ctx;
        const webSite = ctx.env === 'test' ? 'freelog' : 'testFreelog';
        ctx.redirect(`https://www.${webSite}.com/login?redirect=${encodeURIComponent(`https://${ctx.host}/`)}`);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZXh0ZW5kL2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDLDJFQUEyRTtBQUMzRSw2QkFBNkI7QUFZN0Isa0JBQWU7SUFDYixRQUFRLEVBQUUsSUFBSTtJQUNkLEtBQUssRUFBRTtRQUNMLGtCQUFrQixFQUFFLEVBQUU7S0FDdkI7SUFDRCxtQkFBbUIsQ0FBQyxPQUFpQjtRQUNuQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNsQyxJQUFJLFFBQVEsSUFBSSxJQUFJO1lBQUUsT0FBTTtRQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDeEQsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFBO1FBRXJELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQzlCLEdBQUcsRUFBRSxXQUFXLFFBQVEsQ0FBQyxVQUFVLGNBQWM7WUFDakQsR0FBRyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQy9CLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIsR0FBRyxFQUFFLFFBQVEsR0FBRyxPQUFPO1lBQ3ZCLEdBQUcsRUFBRSxRQUFRO1lBQ2IsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztTQUNuQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRVosTUFBTSxNQUFNLEdBQVcsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFO1lBQzlCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsZUFBZTtRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDcEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBO1FBQ2hFLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxPQUFPLHVCQUF1QixrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN2RyxDQUFDO0NBQ2MsQ0FBQSJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return async (ctx, next) => {
        try {
            const nodeInfo = await resolveNodeDomain(ctx);
            console.log(nodeInfo);
            // const subNodeDomain: string = getSubNodeDomain(ctx.host)
            const subNodeDomain = "snnaenu";
            const [title, keywords, description] = ['飞致节点', '', ''];
            if (nodeInfo == null) {
                const message = `sorry,${subNodeDomain} is not freelog website`;
                await ctx.render('invalid-nodeDomain.html', { title, keywords, description, message });
                return;
            }
            else {
                if (nodeInfo.status === 2) {
                    const message = `sorry,${subNodeDomain} is not freelog website`;
                    await ctx.render('invalid-nodeDomain.html', { title, keywords, description, message });
                    return;
                }
                if (nodeInfo.pageBuildId === '') {
                    const message = `${nodeInfo.isTestNode ? '测试节点' : '节点'}异常，错误代码：未添加主题或主题未激活`;
                    await ctx.render('no-pagebuild.html', { title, keywords, description, message });
                    return;
                }
                if (nodeInfo.isTestNode) {
                    const { userId } = ctx.request;
                    if (nodeInfo.ownerUserId !== userId) {
                        const message = '未获得授权，测试节点访问拒绝';
                        await ctx.render('auth-error.html', { title, keywords, description, message });
                        return;
                    }
                }
                ctx.generateNodeJwtInfo(nodeInfo, ctx.app.config.jwtAuth);
                ctx.nodeInfo = nodeInfo;
                await next();
            }
        }
        catch (e) {
            ctx.logger.info(e);
            ctx.body = e;
        }
    };
    async function resolveNodeDomain(ctx) {
        let subNodeDomain = ctx.host.split('.')[0];
        const regexNodeDomain = new RegExp(/^(?!-)[a-z0-9-]{4,24}(?<!-)$/);
        // console.log(ctx.host, ctx.host.split('snnaenu.testfreelog.com/#/'))
        if (regexNodeDomain.test(subNodeDomain)) {
            // TODO 提交代码前注释打开
            return null;
        }
        subNodeDomain = "snnaenu";
        const nodeInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfoV2}/detail?nodeDomain=${subNodeDomain}`, {});
        if (/^t\./.test(ctx.host)) {
            const testNodeRuleInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfoV2}/detail?nodeDomain=${subNodeDomain}`);
            nodeInfo.isTestNode = true;
            nodeInfo.pageBuildId = testNodeRuleInfo ? testNodeRuleInfo.themeId : "";
        }
        return nodeInfo;
    }
    // function getSubNodeDomain(host: string): string {
    //    return host.replace(/(\.freelog\.com|\.testfreelog\.com)/i, '').replace(/^t\./, '')
    // }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZURvbWFpbkF1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmUvbm9kZURvbWFpbkF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTyxLQUFLLEVBQUUsR0FBbUIsRUFBRSxJQUFvQixFQUFFLEVBQUU7UUFDekQsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUF5QixNQUFNLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDckIsMkRBQTJEO1lBQzNELE1BQU0sYUFBYSxHQUFFLFNBQVMsQ0FBQztZQUMvQixNQUFNLENBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUUsR0FBRyxDQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUE7WUFDM0QsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUNwQixNQUFNLE9BQU8sR0FBVyxTQUFTLGFBQWEseUJBQXlCLENBQUE7Z0JBQ3ZFLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7Z0JBQ3RGLE9BQU07YUFDUDtpQkFBTTtnQkFDTCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN6QixNQUFNLE9BQU8sR0FBVyxTQUFTLGFBQWEseUJBQXlCLENBQUE7b0JBQ3ZFLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7b0JBQ3RGLE9BQU07aUJBQ1A7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLEVBQUUsRUFBRTtvQkFDL0IsTUFB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
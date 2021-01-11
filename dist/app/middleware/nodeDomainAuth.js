"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return async (ctx, next) => {
        try {
            const nodeInfo = await resolveNodeDomain(ctx);
            let subNodeDomain = getSubNodeDomain(ctx.host);
            // subNodeDomain ="snnaenu";
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
        console.log(subNodeDomain);
        // subNodeDomain ="snnaenu";
        if (!regexNodeDomain.test(subNodeDomain)) {
            return null;
        }
        const nodeInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfoV2}/detail?nodeDomain=${subNodeDomain}`, {});
        if (/^t\./.test(ctx.host)) {
            const testNodeRuleInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfoV2}/detail?nodeDomain=${subNodeDomain}`);
            nodeInfo.isTestNode = true;
            nodeInfo.pageBuildId = testNodeRuleInfo ? testNodeRuleInfo.themeId : "";
        }
        return nodeInfo;
    }
    function getSubNodeDomain(host) {
        return host.replace(/(\.freelog\.com|\.testfreelog\.com)/i, '').replace(/^t\./, '');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZURvbWFpbkF1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmUvbm9kZURvbWFpbkF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTyxLQUFLLEVBQUUsR0FBbUIsRUFBRSxJQUFvQixFQUFFLEVBQUU7UUFDekQsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUF5QixNQUFNLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ25FLElBQUksYUFBYSxHQUFXLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0RCw0QkFBNEI7WUFDNUIsTUFBTSxDQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFFLEdBQUcsQ0FBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFBO1lBQzNELElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDcEIsTUFBTSxPQUFPLEdBQVcsU0FBUyxhQUFhLHlCQUF5QixDQUFBO2dCQUN2RSxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUN0RixPQUFNO2FBQ1A7aUJBQU07Z0JBQ0wsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDekIsTUFBTSxPQUFPLEdBQVcsU0FBUyxhQUFhLHlCQUF5QixDQUFBO29CQUN2RSxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO29CQUN0RixPQUFNO2lCQUNQO2dCQUNELElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxFQUFFLEVBQUU7b0JBQy9CLE1BQU0sT0FBTyxHQUFXLEdB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
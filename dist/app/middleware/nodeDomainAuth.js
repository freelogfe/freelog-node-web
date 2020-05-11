"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return async (ctx, next) => {
        try {
            const nodeInfo = await resolveNodeDomain(ctx);
            const subNodeDomain = getSubNodeDomain(ctx.host);
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
            console.log(e);
            ctx.body = e;
        }
    };
    async function resolveNodeDomain(ctx) {
        let subNodeDomain = getSubNodeDomain(ctx.host);
        const regexNodeDomain = new RegExp(/^(?!-)[a-z0-9-]{4,24}(?<!-)$/);
        if (!regexNodeDomain.test(subNodeDomain)) {
            return null;
        }
        const nodeInfo = await ctx.curlIntranetApi(`${ctx.webApi.nodeInfo}/detail?nodeDomain=${subNodeDomain}`);
        if (/^t\./.test(ctx.host)) {
            const testNodeRuleInfo = await ctx.curlIntranetApi(`${ctx.webApi.testNode}/${nodeInfo.nodeId}`);
            nodeInfo.isTestNode = true;
            nodeInfo.pageBuildId = testNodeRuleInfo ? testNodeRuleInfo.themeId : "";
        }
        return nodeInfo;
    }
    function getSubNodeDomain(host) {
        host = 'f-comics.testfreelog.com';
        return host.replace(/(\.freelog\.com|\.testfreelog\.com)/i, '').replace(/^t\./, '');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZURvbWFpbkF1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmUvbm9kZURvbWFpbkF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQW9CLEVBQUUsRUFBRTtRQUNsRCxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQXlCLE1BQU0saUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbkUsTUFBTSxhQUFhLEdBQVcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hELE1BQU0sQ0FBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBRSxHQUFHLENBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQTtZQUMzRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BCLE1BQU0sT0FBTyxHQUFXLFNBQVMsYUFBYSx5QkFBeUIsQ0FBQTtnQkFDdkUsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtnQkFDdEYsT0FBTTthQUNQO2lCQUFNO2dCQUNMLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3pCLE1BQU0sT0FBTyxHQUFXLFNBQVMsYUFBYSx5QkFBeUIsQ0FBQTtvQkFDdkUsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtvQkFDdEYsT0FBTTtpQkFDUDtnQkFDRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLEtBQUssRUFBRSxFQUFFO29CQUMvQixNQUFNLE9BQU8sR0FBVyxHQUFHLFFBQVEsQ0FBQyxV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
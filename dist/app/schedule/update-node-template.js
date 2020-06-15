"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path = require("path");
exports.default = {
    schedule: {
        // cron: '* */1 * * * *', 
        interval: '3m',
        type: 'all',
        immediate: true,
    },
    async task(ctx) {
        try {
            const res = await ctx.curl(ctx.app.config.nodePageTpl.url);
            ctx.cache.nodePageTplContent = res.data.toString();
            fse.writeFileSync(path.join(ctx.app.baseDir, 'app/view/pagebuild.html'), ctx.cache.nodePageTplContent);
            ctx.logger.info(`[Schedule worker-${process.pid}]：节点模板缓存更新成功！`);
        }
        catch (e) {
            ctx.logger.error(`[Schedule worker-${process.pid}]：获取节点模板文件失败。${e}`);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW5vZGUtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NjaGVkdWxlL3VwZGF0ZS1ub2RlLXRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsZ0NBQWdDO0FBQ2hDLDZCQUE2QjtBQUU3QixrQkFBZTtJQUNkLFFBQVEsRUFBRTtRQUNULDBCQUEwQjtRQUMxQixRQUFRLEVBQUUsSUFBSTtRQUNaLElBQUksRUFBRSxLQUFLO1FBQ2IsU0FBUyxFQUFFLElBQUk7S0FDZDtJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBYTtRQUN0QixJQUFJO1lBQ0wsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMxRCxHQUFHLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDbEQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1lBQ3RHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixPQUFPLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQTtTQUMvRDtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLE9BQU8sQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3BFO0lBQ0QsQ0FBQztDQUNGLENBQUEifQ==
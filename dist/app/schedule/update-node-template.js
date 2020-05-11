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
            // const res = await ctx.curl(ctx.app.config.nodePageTpl.url) 
            // ctx.cache.nodePageTplContent = res.data.toString()
            const pbPath = path.join(ctx.app.baseDir, 'app/view/pagebuild.html');
            const res = fse.readFileSync(pbPath).toString();
            ctx.cache.nodePageTplContent = res.toString();
            ctx.logger.info(`schedule worker-${process.pid}：节点模板缓存更新成功！`);
        }
        catch (e) {
            ctx.logger.error(`[schedule worker-${process.pid}]：获取节点模板文件失败。${e}`);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW5vZGUtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NjaGVkdWxlL3VwZGF0ZS1ub2RlLXRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQWdDO0FBQ2hDLDZCQUE2QjtBQUc3QixrQkFBZTtJQUNkLFFBQVEsRUFBRTtRQUNULDBCQUEwQjtRQUMxQixRQUFRLEVBQUUsSUFBSTtRQUNaLElBQUksRUFBRSxLQUFLO1FBQ2IsU0FBUyxFQUFFLElBQUk7S0FDZDtJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBYTtRQUN0QixJQUFJO1lBQ0wsOERBQThEO1lBQzlELHFEQUFxRDtZQUNyRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLENBQUE7WUFDcEUsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUMvQyxHQUFHLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUM3QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUE7U0FDN0Q7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixPQUFPLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNwRTtJQUNELENBQUM7Q0FDRixDQUFBIn0=
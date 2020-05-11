"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            ctx.logger.info(`schedule worker-${process.pid}：节点模板缓存更新成功！`);
        }
        catch (e) {
            ctx.logger.error(`[schedule worker-${process.pid}]：获取节点模板文件失败。${e}`);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW5vZGUtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NjaGVkdWxlL3VwZGF0ZS1ub2RlLXRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDZCxRQUFRLEVBQUU7UUFDVCwwQkFBMEI7UUFDMUIsUUFBUSxFQUFFLElBQUk7UUFDWixJQUFJLEVBQUUsS0FBSztRQUNiLFNBQVMsRUFBRSxJQUFJO0tBQ2Q7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQWE7UUFDdEIsSUFBSTtZQUNMLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDMUQsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixPQUFPLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQTtTQUM3RDtRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLE9BQU8sQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3BFO0lBQ0QsQ0FBQztDQUNGLENBQUEifQ==
import fse = require('fs-extra')
import path = require('path')
import { Context } from 'midway'

export default {
	schedule: {
		// cron: '* */1 * * * *', 
		interval: '3m',
    type: 'all', // 指定所有的 worker 都需要执行
		immediate: true,
  },
  async task(ctx:  Context) {
    try {
			// const res = await ctx.curl(ctx.app.config.nodePageTpl.url) 
			// ctx.cache.nodePageTplContent = res.data.toString()
			const pbPath = path.join(ctx.app.baseDir, 'app/view/pagebuild.html')
			const res = fse.readFileSync(pbPath).toString()
			ctx.cache.nodePageTplContent = res.toString()
			ctx.logger.info(`schedule worker-${process.pid}：节点模板缓存更新成功！`)
		} catch(e) {
			ctx.logger.error(`[schedule worker-${process.pid}]：获取节点模板文件失败。${e}`)
		}
  },
}

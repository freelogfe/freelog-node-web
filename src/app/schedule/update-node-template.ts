import { Context } from 'midway'
import fse = require('fs-extra')
import path = require('path')

export default {
	schedule: {
		// cron: '* */1 * * * *', 
		interval: '3s',
    type: 'all', // 指定所有的 worker 都需要执行
		immediate: true,
  },
  async task(ctx:  Context) {
    try {
			const res = await ctx.curl(ctx.app.config.nodePageTpl.url) 
			ctx.cache.nodePageTplContent = res.data.toString()
			fse.writeFileSync(path.join(ctx.app.baseDir, 'app/view/pagebuild.html'), ctx.cache.nodePageTplContent)
			// ctx.logger.info(`[Schedule worker-${process.pid}]：节点模板缓存更新成功！`)
		} catch(e) {
			ctx.logger.error(`[Schedule worker-${process.pid}]：获取节点模板文件失败。${e}`)
		}
  },
}

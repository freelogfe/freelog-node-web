import { provide, Application, inject } from 'midway'
import { FreelogContext } from 'egg-freelog-base'

@provide()
export default class AppBootHook {
  app: Application

  @inject()
  ctx: FreelogContext | undefined

  constructor(app: Application) {
    this.app = app
    // app.config.coreMiddleware.unshift('identityCookieAuthentication')
  }

  async didReady() {
    // 应用已经启动完毕
    console.log('[App]: Did ready!')
    
    this.app.messenger.on('refresh', async (by: string) => {
      await this.app.runSchedule('update-node-template')
      this.app.logger.info('Start update by %s', by, process.pid);
    })
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    console.log('[Server]: Did ready!!')
  }
}

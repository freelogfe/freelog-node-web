import { controller, get, provide, inject } from 'midway'
import { HomeService } from './home.service'
import { ApplicationError, FreelogContext } from 'egg-freelog-base'

@provide()
@controller('/')
export class HomeController {

  constructor(
    @inject() private homeService: HomeService
  ) {}

	/**
	 * 触发更新节点模板事件
	 */
  @get('/home/triggerUpdateNodeTemplateEvent')
	public async triggerUpdateNodeTemplateEvent(ctx: FreelogContext): Promise<void> {
    try {
      ctx.app.messenger.sendToApp('refresh', 'pull')
      await ctx.app.runSchedule('update-node-template')
      ctx.success(`模板更新成功！PID：${process.pid}！`)
    } catch(e) {
      ctx.error(new ApplicationError( `模版更新失败：${e.toString()}`))
    }
	}

  @get('/*')
  public async index(ctx: FreelogContext): Promise<void> {
    try {
      await this.homeService.renderNodeHomeIndex(ctx.nodeInfo)
    } catch(error) {
      await ctx.render('error.html', { error })
    }
  }
}


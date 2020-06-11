import { Context, controller, get, provide, inject } from 'midway'
import { HomeService } from './home.service'
// import { INodePageTpl } from '../../interface'
import errorCodeEnum from '../../enum/error-code'
import retCodeEnum from '../../enum/ret-code'

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
	public async triggerUpdateNodeTemplateEvent(ctx: Context): Promise<void> {
    try {
      ctx.app.messenger.sendToApp('refresh', 'pull')
      ctx.success('模板更新成功')
    } catch(e) {
      ctx.error({
        msg: `模版更新失败：${e.toString()}`,
        errCode: errorCodeEnum.autoSnapError,
        retCode: retCodeEnum.serverError,
        data: null
      })
    }
	}

  @get('/*')
  public async index(ctx: Context): Promise<void> {
    try {
      await this.homeService.renderNodeHomeIndex(ctx.nodeInfo)
    } catch(error) {
      await ctx.render('error.html', { error })
    }
  }
}


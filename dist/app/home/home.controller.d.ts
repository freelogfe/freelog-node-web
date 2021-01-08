import { HomeService } from './home.service';
import { FreelogContext } from 'egg-freelog-base';
export declare class HomeController {
    private homeService;
    constructor(homeService: HomeService);
    /**
     * 触发更新节点模板事件
     */
    triggerUpdateNodeTemplateEvent(ctx: FreelogContext): Promise<void>;
    index(ctx: FreelogContext): Promise<void>;
}

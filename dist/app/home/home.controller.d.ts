import { Context } from 'midway';
import { HomeService } from './home.service';
export declare class HomeController {
    private homeService;
    constructor(homeService: HomeService);
    /**
     * 触发更新节点模板事件
     */
    triggerUpdateNodeTemplateEvent(ctx: Context): Promise<void>;
    index(ctx: Context): Promise<void>;
}

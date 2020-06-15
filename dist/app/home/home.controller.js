"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const home_service_1 = require("./home.service");
// import { INodePageTpl } from '../../interface'
const error_code_1 = require("../../enum/error-code");
const ret_code_1 = require("../../enum/ret-code");
let HomeController = class HomeController {
    constructor(homeService) {
        this.homeService = homeService;
    }
    /**
     * 触发更新节点模板事件
     */
    async triggerUpdateNodeTemplateEvent(ctx) {
        try {
            ctx.app.messenger.sendToApp('refresh', 'pull');
            await ctx.app.runSchedule('update-node-template');
            ctx.success(`模板更新成功！PID：${process.pid}！`);
        }
        catch (e) {
            ctx.error({
                msg: `模版更新失败：${e.toString()}`,
                errCode: error_code_1.default.autoSnapError,
                retCode: ret_code_1.default.serverError,
                data: null
            });
        }
    }
    async index(ctx) {
        try {
            await this.homeService.renderNodeHomeIndex(ctx.nodeInfo);
        }
        catch (error) {
            await ctx.render('error.html', { error });
        }
    }
};
__decorate([
    midway_1.get('/home/triggerUpdateNodeTemplateEvent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "triggerUpdateNodeTemplateEvent", null);
__decorate([
    midway_1.get('/*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "index", null);
HomeController = __decorate([
    midway_1.provide(),
    midway_1.controller('/'),
    __param(0, midway_1.inject()),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ob21lL2hvbWUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrRTtBQUNsRSxpREFBNEM7QUFDNUMsaURBQWlEO0FBQ2pELHNEQUFpRDtBQUNqRCxrREFBNkM7QUFJN0MsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUV6QixZQUNvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUN6QyxDQUFDO0lBRUw7O09BRUc7SUFFSSxLQUFLLENBQUMsOEJBQThCLENBQUMsR0FBWTtRQUNyRCxJQUFJO1lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUM5QyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUE7WUFDakQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1NBQzFDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDVCxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNSLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDN0IsT0FBTyxFQUFFLG9CQUFhLENBQUMsYUFBYTtnQkFDcEMsT0FBTyxFQUFFLGtCQUFXLENBQUMsV0FBVztnQkFDaEMsSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFDLENBQUE7U0FDSDtJQUNKLENBQUM7SUFHTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQVk7UUFDN0IsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDekQ7UUFBQyxPQUFNLEtBQUssRUFBRTtZQUNiLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQzFDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF2QkE7SUFERSxZQUFHLENBQUMsc0NBQXNDLENBQUM7Ozs7b0VBYzVDO0FBR0E7SUFEQyxZQUFHLENBQUMsSUFBSSxDQUFDOzs7OzJDQU9UO0FBaENVLGNBQWM7SUFGMUIsZ0JBQU8sRUFBRTtJQUNULG1CQUFVLENBQUMsR0FBRyxDQUFDO0lBSVgsV0FBQSxlQUFNLEVBQUUsQ0FBQTtxQ0FBc0IsMEJBQVc7R0FIakMsY0FBYyxDQWlDMUI7QUFqQ1ksd0NBQWMifQ==
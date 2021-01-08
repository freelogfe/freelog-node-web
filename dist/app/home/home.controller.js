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
exports.HomeController = void 0;
const midway_1 = require("midway");
const home_service_1 = require("./home.service");
const egg_freelog_base_1 = require("egg-freelog-base");
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
            ctx.error(new egg_freelog_base_1.ApplicationError(`模版更新失败：${e.toString()}`));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ob21lL2hvbWUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBeUQ7QUFDekQsaURBQTRDO0FBQzVDLHVEQUFtRTtBQUluRSxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBRXpCLFlBQ29CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQ3pDLENBQUM7SUFFTDs7T0FFRztJQUVJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxHQUFtQjtRQUM1RCxJQUFJO1lBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUM5QyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUE7WUFDakQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1NBQzFDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDVCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksbUNBQWdCLENBQUUsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDM0Q7SUFDSixDQUFDO0lBR08sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFtQjtRQUNwQyxJQUFJO1lBQ0YsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUN6RDtRQUFDLE9BQU0sS0FBSyxFQUFFO1lBQ2IsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7U0FDMUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWxCQTtJQURFLFlBQUcsQ0FBQyxzQ0FBc0MsQ0FBQzs7OztvRUFTNUM7QUFHQTtJQURDLFlBQUcsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBT1Q7QUEzQlUsY0FBYztJQUYxQixnQkFBTyxFQUFFO0lBQ1QsbUJBQVUsQ0FBQyxHQUFHLENBQUM7SUFJWCxXQUFBLGVBQU0sRUFBRSxDQUFBO3FDQUFzQiwwQkFBVztHQUhqQyxjQUFjLENBNEIxQjtBQTVCWSx3Q0FBYyJ9
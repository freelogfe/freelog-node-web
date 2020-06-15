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
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
let AppBootHook = class AppBootHook {
    constructor(app) {
        this.app = app;
        // app.config.coreMiddleware.unshift('identityCookieAuthentication')
    }
    async didReady() {
        // 应用已经启动完毕
        console.log('[App]: Did ready!');
        this.app.messenger.on('refresh', async (by) => {
            await this.app.runSchedule('update-node-template');
            this.app.logger.info('Start update by %s', by, process.pid);
        });
    }
    async serverDidReady() {
        // http / https server 已启动，开始接受外部请求
        // 此时可以从 app.server 拿到 server 的实例
        console.log('[Server]: Did ready!!');
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], AppBootHook.prototype, "ctx", void 0);
AppBootHook = __decorate([
    midway_1.provide(),
    __metadata("design:paramtypes", [midway_1.Application])
], AppBootHook);
exports.default = AppBootHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1DQUE4RDtBQUc5RCxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVc7SUFNOUIsWUFBWSxHQUFnQjtRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLG9FQUFvRTtJQUN0RSxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVE7UUFDWixXQUFXO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBRWhDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFO1lBQ3BELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtZQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYztRQUNsQixtQ0FBbUM7UUFDbkMsaUNBQWlDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0NBQ0YsQ0FBQTtBQXRCQztJQURDLGVBQU0sRUFBRTs7d0NBQ2U7QUFKTCxXQUFXO0lBRC9CLGdCQUFPLEVBQUU7cUNBT1Msb0JBQVc7R0FOVCxXQUFXLENBMEIvQjtrQkExQm9CLFdBQVcifQ==
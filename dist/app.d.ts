import { Application } from 'midway';
import { FreelogContext } from 'egg-freelog-base';
export default class AppBootHook {
    app: Application;
    ctx: FreelogContext | undefined;
    constructor(app: Application);
    didReady(): Promise<void>;
    serverDidReady(): Promise<void>;
}

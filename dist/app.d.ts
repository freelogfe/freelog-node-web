import { Application, Context } from 'midway';
export default class AppBootHook {
    app: Application;
    ctx: Context | undefined;
    constructor(app: Application);
    didReady(): Promise<void>;
    serverDidReady(): Promise<void>;
}

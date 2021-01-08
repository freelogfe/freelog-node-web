/// <reference path="../../../src/globals.d.ts" />
import { INodeInfo } from "../home/home.model";
import { IJwtAuth, ICache } from '../../interface';
import { FreelogContext } from 'egg-freelog-base';
export interface NewApi {
    freelog: string;
    testfreelog: string;
}
export interface IExtendedCtx extends FreelogContext {
    nodeInfo: INodeInfo | null;
    cache: ICache;
    generateNodeJwtInfo(jwtAuth: IJwtAuth): void;
    redictLoginPage(): void;
    newApi: NewApi;
}
declare const _default: IExtendedCtx;
export default _default;

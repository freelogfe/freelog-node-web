/// <reference path="../../../src/globals.d.ts" />
import { INodeInfo } from "../home/home.model";
import { Context } from 'midway';
import { IJwtAuth, ICache } from '../../interface';
export interface IExtendedCtx extends Context {
    nodeInfo: INodeInfo | null;
    cache: ICache;
    generateNodeJwtInfo(jwtAuth: IJwtAuth): void;
    redictLoginPage(): void;
}
declare const _default: IExtendedCtx;
export default _default;

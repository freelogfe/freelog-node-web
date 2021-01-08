/// <reference path="../../../src/globals.d.ts" />
import { FreelogContext } from 'egg-freelog-base';
import { INodeInfo } from './home.model';
export declare class HomeService {
    private ctx;
    constructor(ctx: FreelogContext);
    renderNodeHomeIndex(nodeInfo: INodeInfo): Promise<void>;
    private resolveSubReleases;
    private findValueByKeyIgnoreUpperLower;
}

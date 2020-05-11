/// <reference path="../../../src/globals.d.ts" />
import { Context } from 'midway';
import { INodeInfo } from './home.model';
export declare class HomeService {
    private ctx;
    constructor(ctx: Context);
    renderNodeHomeIndex(nodeInfo: INodeInfo): Promise<void>;
    private resolveSubReleases;
    private findValueByKeyIgnoreUpperLower;
}

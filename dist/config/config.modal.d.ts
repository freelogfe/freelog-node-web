import { EggAppConfig, PowerPartial } from 'midway';
import { INodePageTpl, IJwtAuth, IClientCredentialInfo } from '../interface';
export interface DefaultConfig extends PowerPartial<EggAppConfig> {
    nodePageTpl: INodePageTpl;
    jwtAuth: IJwtAuth;
    clientCredentialInfo: IClientCredentialInfo;
}

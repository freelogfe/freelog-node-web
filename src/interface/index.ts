
export interface PlainObject {
  [key: string]: any
}

export type nextDefinition = () => Promise<any>

export interface IJwtAuth {
  cookieName: string
  publicKey: string
  privateKey: string
}

export interface INodePageTpl {
  url: string
}

export interface ICache {
  nodePageTplContent: string
}

export interface IJwtAuth { 
  cookieName: string
  publicKey: string
  privateKey: string
}

export interface IClientCredentialInfo {
  clientId: number
  publicKey: string
  privateKey: string
}

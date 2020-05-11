
export interface INodeInfo {
  status: Number
  ownerUserId: Number
  nodeId: Number
  pageBuildId: String
  nodeName: String
  nodeDomain: String
  createDate: String
  updateDate: String
  isTestNode?: Boolean
}

export interface ITestNodeRuleInfo {
  status: Number
  nodeId: Number
  userId: Number
  ruleText: String
  themeId: String
  createDate: String
  updateDate: String
  testRules: any []
}

export type IDomainResolveResult = INodeInfo | null


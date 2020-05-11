export default () => {
  return {
    cluster: {
      listen: { port: 5777 }
    },
    gatewayUrl: 'http://api-gateway-service.development:6895',
    nodePageTpl: {
      // 节点首页模板文件地址
      url: 'http://test-frcdn.oss-cn-shenzhen.aliyuncs.com/pagebuild/index.html',
    }
  }
}
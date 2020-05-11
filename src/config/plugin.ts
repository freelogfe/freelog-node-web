
export default {
  static: {
    enable: true,
    package: 'egg-static',
  },
  cors: {
    enable: false,
    package: 'egg-cors',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  eggFreelogBase: {
    enable: true,
    package: 'egg-freelog-base',
  }
}

// false 禁用全部安全检查用于临时调试
// export const security = false


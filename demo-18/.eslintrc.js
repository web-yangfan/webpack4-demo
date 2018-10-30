module.exports = {
  root: true, // 表明文件是在根目录
  extends: 'standard', // 使用standard标准
  plugins: [],
  env: {  // 定义环境
    browser: true  // 浏览器环境
    // node: true, // node环境
  },
  rules: {  // 规则
    // 设置缩进为4个空格
    'indent': ['error', 4],
    // 关闭代码最后空格检查
    'no-multiple-empty-lines': 0
  },
  globals: {
    // 定义$为全局变量
    $: true
  }
}

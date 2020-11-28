module.exports = {
  root: true, // 指定配置文件根目录：表示当前文件为eslint的根配置文件，逐层查找时无需往更上一级的文件目录中进行搜索
  extends: ['airbnb'], // 指定eslint解析器：babel-eslint是围绕Babel解析器的包装器使其与ESLint兼容；可能值espree、esprima
  parser: 'babel-eslint', // 把源代码转译成语法树的工具
  parserOptions: { // 解析器的选项 AST语法树解析
    sourceType: 'module', // 指定js的导入方式，module是指通过模块导入，默认值为script(表示通过script标签引入)
    ecmaVersion: 2015,
  },
  env: { // 指定运行环境
    browser: true,
    node: true,
  },
  rules: {
    // 这个可以覆盖掉继承的规则
    'no-console': process.env === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off', // ，是因为不同系统不同工具下换行符的问题
  },
};

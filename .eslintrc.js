module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    // window mac 系统换行符问题处理
    'linebreak-style': 0,
    // 允许使用 any 类型，但请少用。除非实在无法确定类型且 unknown 也无法解决时
    '@typescript-eslint/no-explicit-any': 'off',
    // 限制函数是否一定要定义返回值类型
    // '@typescript-eslint/explicit-module-boundary-types': 'on',
  },
};

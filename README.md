# 彩虹海🌈 后端项目

## nestjs + ts  构建

### 安装 vscode 插件

- eslint 
- prettier
- EditorConfig for Visual Studio Code

### 前端项目链接
[rainbow-sea-front](https://github.com/zihao-web/rainbow-sea-front)

### 启动项目

```
npm run start
```

### 检查代码格式

```
npm run eslint
```

### 运行单元测试

```
npm run jest
```

### 构建项目

```
npm run build
```

### 目录

```
├── build
│   └── index.js               // 自动化构建脚本
├── public                     // 静态资源
├── tests                      // 测试
├── src
│   ├── api                    // api接口管理
│   ├── asset                  // 主要放css, 图片等资源文件
│   ├── component              // vue 组件
│   ├── utils                  // 公共工具文件
│   ├── pages                  // vue 页面
│   ├── layout                 // vue 页面
│   ├── plugins                // vue 插件
│   ├── router                 // router 路由
│   ├── types                  // ts 类型存放
│   └── store                  // vuex 全局数据共享
├── index.html                 // html 模版
├── .eslintignore              // eslint 校验忽略文件
├── .eslintre.js               // eslint 规范配置
├── .editorconfig              // 代码规范
├── .prettierrc                // 格式化代码格式
├── .gitignore                 // git 忽略的文件/目录配置
├── .babel.js                  // babel 配置，在该文件中加babel插件。该项目使用babel7
├── package.json               // 项目配置，外部依赖模块
├── jest.config.js             // jest 配置文件
├── tsconfig.json              // ts 配置文件
└── vite.config.ts             // vite 配置文件
```

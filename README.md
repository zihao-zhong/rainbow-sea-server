# 彩虹海 🌈 后端项目

## nestjs + ts 构建

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

```js
// 下载依赖包
npm install

// 打包构建
npm run build

pm2 start pm2.config.js
pm2 stop pm2.config.js
pm2 restart pm2.config.js
pm2 reload pm2.config.js
pm2 delete pm2.config.js

// 重启服务
pm2 restart nest
```

```js
// 生成 Docker 容器实例 MySQL

mkdir -p /root/docker/rainbow-sea-mysql
cd /root/docker/rainbow-sea-mysql

docker run -it -p 3306:3306 --name rainbow_sea_mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7

docker run -it -p 3306:3306 --name rainbow_sea_mysql \
-v /root/docker/rainbow-sea-mysql/conf:/etc/mysql \
-v /root/docker/rainbow-sea-mysql/logs:/var/log/mysql \
-v /root/docker/rainbow-sea-mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d mysql:5.7 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_unicode_ci

// 进入容器内部
docker exec -it rainbow-sea-mysql bash
mysql -u root -p 123456
// 退出容器
exit


// ============================================


// 生成 Docker 容器实例 Redis
docker run -p 6379:6379 --name rainbow-sea-redis \
-v /root/docker/rainbow-sea-redis/conf/redis.conf:/etc/redis/redis.conf \
-v /root/docker/rainbow-sea-redis/data:/data \
-d redis:7.0.5 redis-server /etc/redis/redis.conf \

```

### 目录

```
├── dist
│   └── index.js               // 构建后的入口文件
├── libs                       // 内部工具库
│   ├── config                 // 项目配置文件
│   ├── db                     // mysql 数据库模型
│   ├── redis                  // redis 数据库方法
│   ├── tools                  // 工具集合
│   ├── email                  // 发送邮件工具
├── src
│   ├── decorator              // 装饰器方法
│   ├── filter                 // 过滤器方法
│   ├── guard                  // 权限方法
│   ├── interceptor            // 拦截器方法
│   ├── middleware             // 中间件方法
│   ├── pipes                  // 管道方法
│   ├── modules                // 模块-业务代码
│   └── types                  // ts 类型存放
├── tests                      // 自动化测试
├── .eslintignore              // eslint 校验忽略文件
├── .eslintre.js               // eslint 规范配置
├── .editorconfig              // 代码规范
├── .prettierrc                // 格式化代码格式
├── .gitignore                 // git 忽略的文件/目录配置
├── package.json               // 项目配置，外部依赖模块
├── jest.config.js             // jest 配置文件
├── tsconfig.json              // ts 配置文件
└── nest-cli.json              // nest 配置文件
```

### 代理

```js
https://segmentfault.com/a/1190000027083723

// 设置成淘宝镜像
npm config set registry http://registry.npm.taobao.org

// 查看设置是否成功
npm get registry
```

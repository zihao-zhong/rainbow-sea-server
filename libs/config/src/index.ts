import { ConfigInterface } from './config.interface';

export default (): ConfigInterface => ({
  // mysql 数据库配置
  database: {
    database: process.env.DATABASE_DATABASE, // 数据库名称
    username: process.env.DATABASE_USERNAME, // 用户名
    password: process.env.DATABASE_PASSWORD, // 密码
    host: process.env.DATABASE_HOST, // 数据库IP地址
    port: parseInt(process.env.DATABASE_PORT, 10), // 数据库端口号
    dialect: process.env.DATABASE_DIALECT as 'mysql', // 数据库类型
  },
  // redis 数据库配置
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    db: parseInt(process.env.REDIS_DB, 10),
    password: process.env.REDIS_PASSWORD,
  },
  // email 邮箱配置
  email: {
    user: process.env.COMPANY_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  // 用户密码加密
  secretKey: process.env.SECRET_KEY,
  // 用户 token 加密
  signKey: process.env.SIGN_KEY,
});

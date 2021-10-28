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
  redis: {},
  // 邮箱配置
  companyEmail: process.env.COMPANY_EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
});

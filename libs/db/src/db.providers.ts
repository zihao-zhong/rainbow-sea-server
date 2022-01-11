import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from './models/user.entity';

export const DbProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const database = configService.get('database');
      // console.log('数据库配置：', database);
      const sequelize = new Sequelize({
        ...database,
        pool: {
          min: 0,
          max: 10,
          idle: 10000,
        },
        logging: false,
      });
      try {
        await sequelize.authenticate();
        console.log('数据库链接成功:', database.host, database.port);

        // 添加模型
        sequelize.addModels([User]);

        /**
         * 自动同步新增的表
         * 如果表已经有数据的那么不会删除数据，不会进行同步
         * 如果只是表的某个字段新增或删除也不会自动同步表结构，需要手动同步
         */
        sequelize.sync()
        return sequelize;
      } catch (error) {
        console.error('数据库连接失败:', database.host, database.port, error);
      }
    },
  },
];

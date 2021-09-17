import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { User } from './models/user.entity';

export const DtProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const database = configService.get('database');
      console.log('数据库配置：', database);
      const sequelize = new Sequelize({
        ...database,
        autoLoadModels: true,
        synchronize: false,
        pool: {
          min: 0,
          max: 10,
          idle: 10000,
        },
      });
      try {
        await sequelize.authenticate();
        console.log('数据库链接成功:', database.host, database.port);
      } catch (error) {
        console.error('数据库连接失败:', database.host, database.port, error);
      }
      sequelize.addModels([User]);
      return sequelize;
    },
  },
];
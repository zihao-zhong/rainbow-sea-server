import { SequelizeOptions } from 'sequelize-typescript';
import { RedisOption } from 'redis';

export interface ConfigInterface {
  database: SequelizeOptions;
  redis: RedisOption;
  email: {
    user: string;
    pass: string;
  },
}

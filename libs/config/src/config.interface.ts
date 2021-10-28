import { SequelizeOptions } from 'sequelize-typescript';

export interface ConfigInterface {
  database: SequelizeOptions;
  redis: {};
  companyEmail: string;
  emailPassword: string;
}

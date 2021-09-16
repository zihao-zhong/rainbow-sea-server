export class Config {
  readonly DATABASE_USER = process.env.DATABASE_USER;
  readonly DATABASE_NAME = process.env.DATABASE_NAME;
  readonly DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  readonly DATABASE_HOST = process.env.DATABASE_HOST;
  readonly DATABASE_PORT = process.env.DATABASE_PORT;
  readonly DATABASE_DIALECT = process.env.DATABASE_DIALECT;
}
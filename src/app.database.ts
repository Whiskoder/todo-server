import { Sequelize } from "sequelize";

import { Envs } from "./envs.config";

export const sequelize = new Sequelize({
  host: Envs.DB_HOST,
  port: Envs.DB_PORT,
  username: Envs.DB_USER,
  password: Envs.DB_PASS,
  database: Envs.DB_NAME,
  dialect: "mysql",
  logging: false,
});

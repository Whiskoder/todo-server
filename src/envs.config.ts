import "dotenv/config";
import { get } from "env-var";

export const Envs = {
  PORT: get("PORT").asPortNumber(),
  DB_HOST: get("DB_HOST").asString(),
  DB_NAME: get("DB_NAME").asString(),
  DB_PASS: get("DB_PASS").asString(),
  DB_PORT: get("DB_PORT").asPortNumber(),
  DB_USER: get("DB_USER").asString(),
};

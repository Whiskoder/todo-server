import { sequelize } from "./app.database";
import { AppServer } from "./app.server";
import { Task } from "./task.model";

(async () => {
  await main();
})();

async function main() {
  console.log("Conectando a la base de datos");
  await sequelize.authenticate();
  console.log("Sincronizando base de datos");
  await Task.sync();
  console.log("Base de datos iniciada");
  const app = AppServer.create();
  app.start();
}

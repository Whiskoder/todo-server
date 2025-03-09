import express from "express";
import { Server } from "http";
import cors from "cors";
import { Envs } from "./envs.config";
import { AppRoutes } from "./app.routes";

export const AppServer = {
  create: () => {
    const app = express();
    const port = Envs.PORT;
    const routes = AppRoutes();

    let instance: Server;

    return {
      start: async () => {
        if (instance) {
          console.log("El servidor ya se está ejecutando");
          return;
        }

        app.use(cors());
        app.use(express.json());

        app.use("/api/", routes);

        instance = app.listen(port, (error) => {
          if (error) {
            throw error;
          }
          console.log(`El servidor se está ejecutando en el puerto ${port}`);
        });
      },
      stop: async () => {
        if (!instance) {
          console.log("El servidor no se está ejecutando");
          return;
        }
        instance.close();
      },
    };
  },
};

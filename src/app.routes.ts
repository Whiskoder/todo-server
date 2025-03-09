import { Router } from "express";
import { AppController } from "./app.controller";

export const AppRoutes = () => {
  const router = Router();

  router.post("/tasks/", AppController.createTask);
  router.get("/tasks/", AppController.getTasks);
  router.get("/tasks/:id", AppController.getTaskById);
  router.put("/tasks/:id", AppController.updateTaskById);
  router.delete("/tasks/:id", AppController.deleteTaskById);

  return router;
};

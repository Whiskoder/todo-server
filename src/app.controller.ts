import { Request, Response } from "express";
import { Task, TaskStatus } from "./task.model";
import { isEnum, isNumber, isString } from "./validations";

// POST /api/tasks
const createTask = async (req: Request, res: Response) => {
  let errors: string[] = [];

  const title = isString({
    value: req.body.title,
    name: "title",
    minLength: 3,
    maxLength: 255,
  });

  if (title.error) errors.push(title.error);

  const description = isString({
    value: req.body.description,
    name: "description",
    minLength: 3,
    maxLength: 255,
  });

  if (description.error) errors.push(description.error);

  if (errors.length > 0) {
    res.status(400).json({ statusCode: 400, message: errors });
    return;
  }

  try {
    const task = Task.build({
      title: title.value,
      description: description.value,
    });
    await task.save();
    const { dataValues } = task;
    res.status(200).json({
      statusCode: 200,
      message: "Tarea creada correctamente",
      task: dataValues,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ statusCode: 500, message: "Error al crear tarea" });
  }
};

// GET /api/tasks
const getTasks = async (req: Request, res: Response) => {
  let errors: string[] = [];

  const limit = isNumber({
    value: req.query.limit,
    name: "limit",
    min: 1,
    max: 100,
    required: false,
  });

  if (limit.error) errors.push(limit.error);

  const offset = isNumber({
    value: req.query.offset,
    name: "offset",
    min: 0,
    required: false,
  });

  if (limit.error) errors.push(limit.error);

  if (errors.length > 0) {
    res.status(400).json({ statusCode: 400, message: errors });
    return;
  }

  try {
    const tasks = await Task.findAll({
      limit: limit.value ?? 100,
      offset: offset.value ?? 0,
    });
    res.status(200).json({
      statusCode: 200,
      message: "Tareas obtenidas correctamente",
      tasks,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ statusCode: 500, message: "Error obteniendo tareas" });
  }
};

// GET /api/tasks/:id
const getTaskById = async (req: Request, res: Response) => {
  let errors: string[] = [];

  const id = isNumber({
    value: req.params.id,
    name: "id",
    min: 1,
  });

  if (errors.length > 0) {
    res.status(400).json({ statusCode: 400, message: errors });
    return;
  }

  try {
    const task = await Task.findByPk(id.value);
    if (!task) {
      res.status(404).json({
        statusCode: 404,
        message: `Tarea no encontrada con id ${id.value}`,
      });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      message: "Tarea obtenida correctamente",
      task,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ statusCode: 500, message: "Error obteniendo tarea" });
  }
};

// PUT /api/tasks/:id
const updateTaskById = async (req: Request, res: Response) => {
  let errors: string[] = [];

  const id = isNumber({
    value: req.params.id,
    name: "id",
    min: 1,
  });

  if (id.error) errors.push(id.error);

  const title = isString({
    value: req.body.title,
    name: "title",
    minLength: 3,
    maxLength: 255,
    required: false,
  });

  if (title.error) errors.push(title.error);

  const description = isString({
    value: req.body.description,
    name: "description",
    minLength: 3,
    maxLength: 255,
    required: false,
  });

  if (description.error) errors.push(description.error);

  const status = isEnum({
    value: req.body.status,
    name: "status",
    values: Object.values(TaskStatus),
    required: false,
  });

  if (status.error) errors.push(status.error);

  if (errors.length > 0) {
    res.status(400).json({ statusCode: 400, message: errors });
    return;
  }

  try {
    const task = await Task.findByPk(id.value);
    if (!task) {
      res.status(404).json({
        statusCode: 404,
        message: `Tarea no encontrada con id ${id.value}`,
      });
      return;
    }
    task.update({
      title: title.value,
      description: description.value,
      status: status.value,
    });
    res.status(200).json({
      statusCode: 200,
      message: "Tarea actualizada correctamente",
      task,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ statusCode: 500, message: "Error actualizando tarea" });
  }
};

// DELETE /api/tasks/:id
const deleteTaskById = async (req: Request, res: Response) => {
  let errors: string[] = [];

  const id = isNumber({
    value: req.params.id,
    name: "id",
    min: 1,
  });

  if (id.error) errors.push(id.error);

  if (errors.length > 0) {
    res.status(400).json({ statusCode: 400, message: errors });
    return;
  }

  try {
    const task = await Task.findByPk(id.value);
    if (!task) {
      res.status(404).json({
        statusCode: 404,
        message: `Tarea no encontrada con id ${id.value}`,
      });
      return;
    }
    await task.destroy();
    res.status(200).json({
      statusCode: 200,
      message: "Tarea eliminada correctamente",
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ statusCode: 500, message: "Error eliminando tarea" });
  }
};

export const AppController = {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};

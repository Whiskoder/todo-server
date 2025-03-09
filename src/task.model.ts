import { DataTypes, Model } from "sequelize";
import { sequelize } from "./app.database";

export enum TaskStatus {
  Pending = "pending",
  Completed = "completed",
}

export class Task extends Model {
  declare id: number;
  declare title: string;
  declare description: string | null;
  declare status: TaskStatus;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(TaskStatus.Completed, TaskStatus.Pending),
      defaultValue: TaskStatus.Pending,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  },
);

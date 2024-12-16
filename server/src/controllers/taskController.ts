import { Request, Response } from "express";
import { readData, writeData } from "../utils/fileHandler";
import { Task } from "../entities/task";
import { v4 as uuidv4 } from "uuid";

export class TaskController {
  //@route GET /api/tasks
  static async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await readData();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Data reading failed!" });
    }
  }

  //@route POST/api/tasks
  static async addTask(req: Request, res: Response): Promise<void> {
    const { title, description, priority, deadline, category, dependencies } =
      req.body;

    try {
      const tasks = await readData();

      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        priority,
        deadline,
        category,
        completed: false,
      };

      tasks.push(newTask);
      await writeData(tasks);

      res
        .status(201)
        .json({ message: "Task added successfully", task: newTask });
    } catch (error) {
      res.status(500).json({ error: "Failed to add task" });
    }
  }

  //@route PUT/api/tasks
  static async updateTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
      title,
      description,
      priority,
      dueDate,
      category,
      dependencies,
      completed,
    } = req.body;

    try {
      const tasks = await readData();
      const taskIndex = tasks.findIndex((task) => task.id === id);

      if (taskIndex === -1) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      // Update task properties
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title ?? tasks[taskIndex].title,
        description: description ?? tasks[taskIndex].description,
        priority: priority ?? tasks[taskIndex].priority,
        deadline: dueDate ?? tasks[taskIndex].deadline,
        category: category ?? tasks[taskIndex].category,
        completed: completed ?? tasks[taskIndex].completed,
      };

      await writeData(tasks);
      res
        .status(200)
        .json({ message: "Task updated successfully", task: tasks[taskIndex] });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  }

  //@route DELETE/api/tasks/:id
  static async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const tasks = await readData();
      const updatedTasks = tasks.filter((task) => task.id !== id);

      if (tasks.length === updatedTasks.length) {
        res.status(404).json({ error: "Task not found" });
        return;
      }

      await writeData(updatedTasks);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  }
}

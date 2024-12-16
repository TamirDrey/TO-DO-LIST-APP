import { promises as fs } from "fs";
import path from "path";
import { Task } from "../entities/task";

const DATA_FILE = path.join("./data.json");

// Read data from the file
export const readData = async (): Promise<Task[]> => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data) as Task[];
  } catch (error) {
    console.error("Error reading data:", error);
    return [];
  }
};

// Write data to the file
export const writeData = async (tasks: Task[]): Promise<void> => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

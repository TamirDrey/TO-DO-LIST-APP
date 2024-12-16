import React, { useState } from "react";
import { Task } from "../types/Task";
import { taskService } from "../api/taskService";
import Button from "./Button";
import { validateTask } from "../utils/validation";
import { toast } from "react-toastify";

interface TaskFormProps {
  initialData?: Task;
  onSubmitSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmitSuccess,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [priority, setPriority] = useState(initialData?.priority || "low");
  const [deadline, setDeadline] = useState(initialData?.deadline || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Task Before Sending
    const taskToValidate = {
      title,
      description,
      priority,
      deadline: deadline,
    };

    if (!validateTask(taskToValidate)) {
      return;
    }

    try {
      if (initialData) {
        // Update Existing Task
        const updatedTask: Task = {
          ...initialData,
          title,
          description,
          priority,
          deadline,
        };
        await taskService.updateTask(updatedTask);
        toast.success("Task updated successfully!");
      } else {
        // Add New Task
        const newTask = { title, description, priority, deadline };
        await taskService.addTask(newTask);
        toast.success("Task added successfully!");
      }
      // Notify Parent and Clear Form
      onSubmitSuccess();
      setTitle("");
      setDescription("");
      setPriority("low");
      setDeadline("");
    } catch (err) {
      toast.error("Failed to save the task. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-sm bg-white"
    >
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Priority</label>
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="w-full border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <Button
        label={initialData ? "Update" : "Add"}
        onClick={() => {}}
      />
    </form>
  );
};

export default TaskForm;

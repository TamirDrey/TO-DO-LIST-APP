import React from "react";
import { Task } from "../types/Task";
import { taskService } from "../api/taskService";
import Button from "./Button";
import TaskForm from "./TaskForm";
import useToggleForm from "../hooks/useToggleForm";

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate }) => {
  const { isFormVisible, openForm, closeForm } = useToggleForm();

  const getBackgroundColor = () => {
    if (task.completed) return "bg-gray-100"; 
    return task.priority === "high"
      ? "bg-red-200"
      : task.priority === "medium"
      ? "bg-yellow-200"
      : task.priority === "low"
      ? "bg-green-200"
      : "bg-gray-100";
  };

  const handleComplete = async () => {
    await taskService.completedTask(task);
    onUpdate();
  };

  const handleDelete = async () => {
    await taskService.deleteTask(task.id);
    onUpdate();
  };

  return (
    <li
      className={`border p-4 mb-2 rounded flex justify-between items-center ${getBackgroundColor()}`}
    >
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.completed ? "Completed" : "Pending"}</p>
        <p>Descripthin: {task.description}</p>
      </div>
      <div className="flex gap-2">
        {task.completed ? (
          <span className="text-green-500 text-2xl font-bold">✔</span>
        ) : (
          <>
            <Button label="Completed" onClick={handleComplete} />
            <Button label="Update" onClick={openForm} />
          </>
        )}
        <Button label="Delete" onClick={handleDelete} />
      </div>
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Update Task</h2>
            <TaskForm
              initialData={task}
              onSubmitSuccess={() => {
                onUpdate();
                closeForm();
              }}
            />

            <Button label="Cancel" onClick={closeForm} />
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;

import React, { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { taskService } from "../api/taskService";
import TaskItem from "../components/TaskItem";

const CompletedTasksPage: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const fetchCompletedTasks = async () => {
    const data = await taskService.getAllTasks();
    const filtered = data.filter((task) => task.completed);
    setCompletedTasks(filtered);
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Completed Tasks</h1>

      {completedTasks.length > 0 ? (
        <ul>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={fetchCompletedTasks}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No completed tasks found.</p>
      )}
    </div>
  );
};

export default CompletedTasksPage;

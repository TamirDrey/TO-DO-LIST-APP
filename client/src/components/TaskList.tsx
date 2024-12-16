import React, { useEffect, useState } from "react";
import { Task } from "../types/Task";
import { taskService } from "../api/taskService";
import TaskItem from "./TaskItem";
import Button from "./Button";
import useToggleForm from "../hooks/useToggleForm";
import TaskForm from "./TaskForm";
import SearchBox from "./SearchBox";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isFormVisible, openForm, closeForm } = useToggleForm();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchTasks = async () => {
    const data = await taskService.getAllTasks();
    const pendingTasks = data.filter((task) => !task.completed);
    setTasks(pendingTasks);
    setFilteredTasks(pendingTasks);
    setSearchPerformed(false);
    setSelectedPriorities([]); 
    setSearchTerm(""); 
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchPerformed(true);
    applyFilters(term, selectedPriorities);
  };

  const handleFilterChange = (priority: string) => {
    setSelectedPriorities((prev) => {
      const updatedPriorities = prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority];
      applyFilters(searchTerm, updatedPriorities);
      return updatedPriorities;
    });
  };

  const applyFilters = (term: string, priorities: string[]) => {
    let filtered = tasks;

    // Filter by search term
    if (term) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filter by priorities
    if (priorities.length > 0) {
      filtered = filtered.filter((task) => priorities.includes(task.priority));
    }

    setFilteredTasks(filtered);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <Button label="Add" onClick={openForm} />
      </div>

      <SearchBox onSearch={handleSearch} />

      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            onChange={() => handleFilterChange("low")}
            checked={selectedPriorities.includes("low")}
          />
          <span>Low Priority</span>
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            onChange={() => handleFilterChange("medium")}
            checked={selectedPriorities.includes("medium")}
          />
          <span>Medium Priority</span>
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            onChange={() => handleFilterChange("high")}
            checked={selectedPriorities.includes("high")}
          />
          <span>High Priority</span>
        </label>
      </div>

      {filteredTasks.length > 0 ? (
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">
          {searchPerformed ? "Task not found" : "No tasks to display."}
        </p>
      )}

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <TaskForm
              onSubmitSuccess={() => {
                fetchTasks();
                closeForm();
              }}
            />
            <Button label="Cancel" onClick={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

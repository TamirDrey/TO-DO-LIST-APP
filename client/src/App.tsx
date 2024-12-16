import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import CompletedTasksPage from "./pages/CompletedTasksPage";
import { ToastContainer } from "react-toastify";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className="p-4 max-w-4xl mx-auto">
          <nav className="flex justify-evenly ">
            <Link to="/" className="text-blue-500 font-bold">
              Task List
            </Link>
            <Link to="/completed" className="text-blue-500 font-bold">
              Completed Tasks
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/completed" element={<CompletedTasksPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;

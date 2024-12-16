import React from 'react';
import TaskList from '../components/TaskList';

const TaskPage: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <TaskList />
    </div>
  );
};

export default TaskPage;

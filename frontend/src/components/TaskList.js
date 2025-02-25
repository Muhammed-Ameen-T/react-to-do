import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/talkList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete?id=${id}`);
      toast.success('Task deleted successfully!');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      toast.error('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className='taskList-container'>
      <ToastContainer />
      {tasks.map((task) => (
        <div className='task-card' key={task.id}>
          <input type='checkbox' className='task-checkbox' checked={task.completed} readOnly />
          <div className='task-details'>
            <span className='task-name'>{task.name}</span>
            <span className='task-date'>{new Date(task.createdAt).toLocaleString()}</span>
          </div>
          <button onClick={() => handleDelete(task.id)} className='delete-icon'>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

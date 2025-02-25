import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/talkList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({isFetched}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [isFetched]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      const sortedTasks = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTasks(sortedTasks);
    } catch (error) {
      toast.error("Failed to fetch tasks. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete?id=${id}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleCheckboxChange = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks?id=${id}`, {
        completed: !completed,
      });
      // toast.success("Task updated successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
      // toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="taskList-container">
      {tasks.map((task) => (
        <div className={`task-card ${task.completed ? "task-completed" : ""}`} key={task.id}>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(task.id, task.completed)}
            className="task-checkbox"
            checked={task.completed}
          />
          <div className="task-details">
            <span className="task-name">{task.name}</span>
            <span className="task-date">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
          <button onClick={() => handleDelete(task.id)} className="delete-icon">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ))};
    </div>
  );
};

export default TaskList;
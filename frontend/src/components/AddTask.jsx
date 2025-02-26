import React, { useState,useEffect} from "react";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/header.css";

const Header = ({fetchHandler}) => {
  const [taskName, setTaskName] = useState("");
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        toast.error("Failed to load tasks.");
        console.error(error);
      });
  }, []);

  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName) {
      toast.error("Task name cannot be empty!");
      return;
    }

    axios
      .post("http://localhost:5000/api/tasks", { name: taskName })
      .then((response) => {
        setTasks([...tasks, response.data]);
        fetchHandler();
        toast.success("Task added successfully!");
        setTaskName(""); 
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to add task. Please try again.");
        }
      });
  };

  return (
    <div className="header-container">
      <ToastContainer />
      <div className="title">
        <h1>To-Do App</h1>
        <img
          style={{ width: "3.7rem" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMA1P0eFq3Kbew1XNz6EfhcuJq06vl2gfRWA&s"
          alt="App Logo"
        />
      </div>
      <div className="add-task-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskName}
            onChange={handleInputChange}
            placeholder="Add a new task..."
            name="name"
            className="task-input"
          />
          <button type="submit" className="add-task-button">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

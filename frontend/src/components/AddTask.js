import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/header.css";

const Header = ({ fetchTasks }) => {
  const [taskName, setTaskName] = useState("");

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
        toast.success("Task added successfully!", {
          onClose: () => window.location.reload()
        });
        setTaskName("");
      })
      .catch((error) => {
        toast.error("Failed to add task. Please try again.");
      });
  };

  return (
    <div className="header-container">
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

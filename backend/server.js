import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models/index.js';
import env from 'dotenv';
env.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await db.Task.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'The task with name already exists!' });
    }
    const newTask = await db.Task.create({ name, completed: false });
    res.json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ success: false, message: 'Failed to add task' });
  }
});

app.delete('/api/delete', async (req, res) => {
  try {
    const { id } = req.query;
    const result = await db.Task.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ success: false, message: 'Failed to delete task' });
  }
});

app.put('/api/tasks', async (req, res) => {
  try {
    const { id } = req.query;
    const { completed } = req.body;
    const task = await db.Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });

    }
    task.completed = completed;
    await task.save();
    res.json({ success: true, task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ success: false, message: 'Failed to update task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
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
    const tasks = await db.Task.findAll(); // Correct reference to Task model
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await db.Task.findOne({ where: { name } }); // Use where clause to find by name
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
      const task = await db.Task.destroy({ where: { id } }); // Correct function for deletion
      res.json({ success: true, message: 'Task deleted successfully', task });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ success: false, message: 'Failed to delete task' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5001;
const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(express.json());

let users = [];
let projects = [];
let tasks = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET);
    res.status(201).json({ token, user: { id: newUser.id, username, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/projects', authenticateToken, (req, res) => {
  const userProjects = projects.filter(project => project.userId === req.user.userId);
  res.json(userProjects);
});

app.post('/api/projects', authenticateToken, (req, res) => {
  const { name, description, deadline } = req.body;
  const newProject = {
    id: Date.now().toString(),
    name,
    description,
    deadline,
    status: 'active',
    userId: req.user.userId,
    createdAt: new Date().toISOString()
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id && p.userId === req.user.userId);
  
  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects[projectIndex] = { ...projects[projectIndex], ...req.body };
  res.json(projects[projectIndex]);
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id && p.userId === req.user.userId);
  
  if (projectIndex === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  projects.splice(projectIndex, 1);
  res.json({ message: 'Project deleted' });
});

app.get('/api/tasks', authenticateToken, (req, res) => {
  const userTasks = tasks.filter(task => task.userId === req.user.userId);
  res.json(userTasks);
});

app.post('/api/tasks', authenticateToken, (req, res) => {
  const { title, description, projectId, priority, dueDate } = req.body;
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    projectId,
    priority,
    dueDate,
    status: 'pending',
    userId: req.user.userId,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id && t.userId === req.user.userId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id && t.userId === req.user.userId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());

let todos = [];
let nextId = 1;

// GET all todos
app.get("/api/todos", (req, res) => {
  console.log("testing");
  
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos
  });
});

// POST new todo
app.post("/api/todos", (req, res) => {
  const { title, description, completed = false, dueDate } = req.body;

  const newTodo = {
    id: nextId++,
    title,
    description,
    completed,
    dueDate,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);

  res.json({
    status: "success",
    message: "To-do created successfully",
    data: newTodo
  });
});

// GET detail todo by ID
app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  res.json({
    status: "success",
    message: "To-do retrieved successfully",
    data: todo
  });
});

// PUT update todo by ID
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  const updated = {
    ...todos[index],
    ...req.body
  };

  todos[index] = updated;

  res.json({
    status: "success",
    message: "To-do updated successfully",
    data: updated
  });
});

// DELETE todo by ID
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  const deleted = todos.splice(index, 1)[0];

  res.json({
    status: "success",
    message: "To-do deleted successfully",
    data: deleted
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json()); // for parsing JSON data
app.use(express.urlencoded({ extended: true })); // for parsing from data
app.use(bodyParser.json()); // Middleware to parse JSON bodies

let tasks = [
    { 
        id: 1, 
        name: "Go to work ;P", 
        complete: false, 
        category: "Work" 
    },
    { 
        id: 2, 
        name: "Get good grades", 
        complete: false, 
        category: "School" 
    },
    { 
        id: 3, 
        name: "Talk to Doctor", 
        complete: false, 
        category: "Health" 
    },
    { 
        id: 4, 
        name: "Buy more batteries", 
        complete: false, 
        category: "Other" 
    },
    { 
        id: 5, 
        name: "Play with dog", 
        complete: true, 
        category: "Other" 
    }
];
let categories = ["Work", "School", "Health", "Other"];

app.get('/', (req, res) => {
    res.send("Hello World! Start of my todo local!")
})

// GET
app.get('/api/todos', (req, res) => {
    // res.send(tasks);
    res.json(tasks);
});

// POST
app.post('/api/todo', (req, res) => {
    // console.log(res.json(tasks));
    // console.log("this is posting")
    const { name, category } = req.body;
    if (name && category) {
        const newTask = {
            id: tasks.length + 1,
            name,
            complete: false,
            category
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } else {
        res.status(400).json({ message: "Name and category are required" });
    }
});

// PUT - Update a task by ID
app.put('/api/todos/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { name, complete, category } = req.body;
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        if (name) task.name = name;
        if (complete !== undefined) task.complete = complete;
        if (category) task.category = category;
        
        res.json(task);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// DELETE - Delete a task by ID
app.delete('/api/todos/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// GET Categories
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// POST Categories 
app.post('/api/category', (req, res) => {
    const { category } = req.body;
    if (category && !categories.includes(category)) {
        categories.push(category);
        res.status(201).json({ category });
    } else {
        res.status(400).json({ message: "Category is required or already exists" });
    }
});

// PUT Categories
app.put('/api/categories/:category', (req, res) => {
    const oldCategory = req.params.category;
    const { newCategory } = req.body;

    if (categories.includes(oldCategory) && newCategory) {
        categories = categories.map(cat => cat === oldCategory ? newCategory : cat);
        res.json({ oldCategory, newCategory });
    } else {
        res.status(400).json({ message: "Category not found or new category name is invalid" });
    }
});

// DELETE Categories
app.delete('/api/categories/:category', (req, res) => {
    const category = req.params.category;
    categories = categories.filter(cat => cat !== category);
    res.status(204).send();
});

// GET /todos/category/:category - Retrieve tasks within a specific category
app.get('/api/todos/category/:category', (req, res) => {
    const category = req.params.category;
    
    // Filter tasks by category
    const categoryTasks = tasks.filter(task => task.category === category);
    
    if (categoryTasks.length > 0) {
        res.json(categoryTasks);
    } else {
        res.status(404).json({ message: `No tasks found for category: ${category}` });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
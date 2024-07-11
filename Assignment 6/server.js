const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3300;

// Middleware to parse request body as JSON
app.use(bodyParser.json());

// In-memory database (for simplicity)
let users = [];

// Basic routes for CRUD operations
// CREATE a new user
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

// READ all users
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

// READ a single user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// UPDATE a user by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
        users[userIndex] = req.body;
        res.status(200).send(users[userIndex]);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.status(200).send(deletedUser);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const port = 3000;

// Middleware example: Logging request details
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, This is my simple webserver!');
});

// Route for /about
app.get('/about', (req, res) => {
    res.send('Assignment 4 from Celebal Technologies');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

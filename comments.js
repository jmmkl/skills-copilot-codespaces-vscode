// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Import comments
let comments = require('./comments.json');

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id == req.params.id);
    res.json(comment);
});

// Add comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

// Update comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id == req.params.id);
    comment.comment = req.body.comment;
    res.json(comment);
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    comments = comments.filter(c => c.id != req.params.id);
    res.json({message: 'Comment deleted'});
});

// Listen
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// Run the server: node comments.js
// Test the server with Postman
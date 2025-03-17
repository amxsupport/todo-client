const express = require('express');
const router = express.Router();
const todoController = require('./todoController');
const authMiddleware = require('./authMiddleware');

// Todo routes (all protected by auth middleware)
router.get('/', authMiddleware, todoController.getTodos);
router.post('/', authMiddleware, todoController.createTodo);
router.put('/:id([0-9a-fA-F]{24})', authMiddleware, todoController.updateTodo); // Validate ObjectId format
router.delete('/:id([0-9a-fA-F]{24})', authMiddleware, todoController.deleteTodo); // Validate ObjectId format
router.get('/:id([0-9a-fA-F]{24})', authMiddleware, todoController.getTodo);

// Handle invalid ObjectId formats
router.use('/:id', (req, res) => {
    res.status(400).json({ error: 'Invalid todo ID format' });
});

module.exports = router;

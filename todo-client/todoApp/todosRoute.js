const express = require('express');
const router = express.Router();
const todoController = require('./todoController');
const authMiddleware = require('./authMiddleware');

// Route pour générer un token JWT
router.post('/login', todoController.login);

// Routes pour les Todos
router.get('/', authMiddleware, todoController.getTodos);          // Récupérer la liste des Todos
router.post('/', authMiddleware, todoController.createTodo);       // Créer une nouvelle Todo

router.get('/:id', authMiddleware, todoController.getTodo);        // Récupérer une Todo par ID
router.put('/:id', authMiddleware, todoController.updateTodo);     // Modifier une Todo par ID
router.delete('/:id', authMiddleware, todoController.deleteTodo);  // Supprimer une Todo par ID

module.exports = router;


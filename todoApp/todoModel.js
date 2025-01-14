const mongoose = require('mongoose');

// Définir le schéma Todo
const todoSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Créer le modèle Todo
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;


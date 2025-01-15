const express = require('express');
const mongoose = require('mongoose');
const todosRouter = require('./todosRoute');

const app = express();
const PORT = 3000;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connecté à la base de données MongoDB : "todo"');
}).catch((err) => {
    console.error('Erreur lors de la connexion à MongoDB:', err);
});

// Middleware pour analyser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to todos API. Try it using /todos' });
});

// Utiliser le routeur pour les routes /todos
app.use('/todos', todosRouter);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



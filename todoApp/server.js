const express = require('express');
const mongoose = require('mongoose');

// Configuration de l'application
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connecté à la base de données MongoDB : "todo"');
}).catch((err) => {
    console.error('Erreur lors de la connexion à MongoDB:', err);
});

// Middleware pour traiter les données JSON
app.use(express.json());

// Route par défaut
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to todos API, try it using /todos' });
});

// Écoute sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});


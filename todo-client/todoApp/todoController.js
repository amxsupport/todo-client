const jwt = require('jsonwebtoken');
const Todo = require('./todoModel'); // Importer le modèle Todo
const User = require('./userModel'); // Importer le modèle User

const SECRET_KEY = "votre_cle_secrete"; // Remplacez par une clé secrète sécurisée

// Générer un token JWT pour un utilisateur
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Récupérer tous les Todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Créer une nouvelle Todo
exports.createTodo = async (req, res) => {
    const { title, completed } = req.body;

    try {
        const newTodo = new Todo({
            userId: req.userId,
            title,
            completed,
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Récupérer une Todo par ID
exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Modifier une Todo par ID
exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Supprimer une Todo par ID
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const todosRouter = require('./todosRoute');
const { SECRET_KEY } = require('./config');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB database: "todo"');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Create default admin user on startup
const createDefaultUser = async () => {
    try {
        const defaultUser = {
            username: 'admin',
            password: 'admin123'
        };
        
        const existingUser = await User.findOne({ username: defaultUser.username });
        if (!existingUser) {
            const newUser = await new User(defaultUser).save();
            console.log('Default user created with ID:', newUser._id);
        } else {
            console.log('Default user already exists with ID:', existingUser._id);
        }
    } catch (error) {
        console.error('Error creating default user:', error);
    }
};

createDefaultUser();

// Auth routes
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt for username:', username);
        
        const user = await User.findOne({ username });
        console.log('User found:', user ? 'yes' : 'no');
        
        if (!user) {
            console.log('No user found with username:', username);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (user.password !== password) {
            console.log('Password mismatch for user:', username);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '24h' });
        console.log('Login successful for user:', username);
        res.json({ token, user: { username: user.username } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Use todos router
app.use('/todos', todosRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;

// Only start the server if this file is run directly
if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

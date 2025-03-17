const Todo = require('./todoModel');

// Get all todos for the authenticated user
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    const { title, completed } = req.body;

    if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newTodo = new Todo({
            userId: req.userId,
            title: title.trim(),
            completed: completed || false
        });

        const savedTodo = await newTodo.save();
        console.log('Todo saved successfully:', savedTodo);
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

// Get a single todo
exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ 
            _id: req.params.id,
            userId: req.userId 
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        console.log('Update todo request:', {
            id: req.params.id,
            userId: req.userId,
            updates: req.body
        });

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            console.log('Todo not found for update');
            return res.status(404).json({ error: 'Todo not found' });
        }

        console.log('Todo updated successfully:', updatedTodo);
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        console.log('Delete todo request:', {
            id: req.params.id,
            userId: req.userId
        });

        const deletedTodo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!deletedTodo) {
            console.log('Todo not found for deletion');
            return res.status(404).json({ error: 'Todo not found' });
        }

        console.log('Todo deleted successfully:', deletedTodo);
        res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};

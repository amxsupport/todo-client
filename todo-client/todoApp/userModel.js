const mongoose = require('mongoose');

// Définir le schéma User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Créer le modèle User
const User = mongoose.model('User', userSchema);

module.exports = User;


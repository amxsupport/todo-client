const mongoose = require('mongoose');

async function resetDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/todo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Drop the collections
        await mongoose.connection.dropDatabase();
        console.log('Successfully dropped database');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

resetDatabase();

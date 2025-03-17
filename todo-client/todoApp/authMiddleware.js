const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No auth token provided');
        return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log('Verifying token...');
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Token verified, userId:', decoded.userId);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

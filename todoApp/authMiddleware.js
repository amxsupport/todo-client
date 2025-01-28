const jwt = require('jsonwebtoken');
const SECRET_KEY = "votre_cle_secrete"; // Remplacez par une clé secrète sécurisée

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'not authorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId; // Transmettre le userId aux autres middlewares
        next();
    } catch (error) {
        return res.status(401).json({ error: 'not authorized' });
    }
};

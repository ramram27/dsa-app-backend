const path = require('path')
const { verifyToken } = require(path.join(__dirname, '../services/token.service'));

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        const error = new Error('No token provided')
        error.status = 401;
        return next(error);
    }
    try {
        const decode = verifyToken(token);
        req.user = decode;
        next();
    } catch (err) {
        err.status = err.status || 401;
        next(err);
    }
}

module.exports = { authMiddleware };
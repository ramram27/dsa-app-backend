const prisma = require('../prisma/client');
const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET || (() => {
    throw new Error('token is not defined')
})();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (() => {
    throw new Error('JWT_REFRESH_SECRET is not defined');
})();
async function refreshToken(token) {
    try {
        const decode = jwt.verify(token, JWT_REFRESH_SECRET);
        const storeToken = await prisma.refreshToken.findUnique({
            where: { token },
            include: { user: true }
        });

        if (!storeToken || storeToken.expiresAt > Date.now()) {
            const err = new Error('Invalid or expired refresh token');
            err.status = 401;
            throw err;
        }
        const access_Token = jwt.sign({ user_id: storeToken.user.id }, JWT_SECRET, { expiresIn: '15m' })
        return { access_Token, user: storeToken.user }
    } catch (err) {
        const error = new Error(err.message || 'Failed to refresh token');
        error.status = err.status || 401;
        throw error;
    }
}

function verifyToken(token) {
    try {
        const decode = jwt.verify(token, JWT_SECRET)
        return decode;
    } catch (err) {
        const error = new Error('Invalid token')
        error.status = 401;
        throw error;
    }
}

async function revokeRefreshToken(token) {
    try {
        jwt.verify(token, JWT_REFRESH_SECRET)
        await prisma.refreshToken.delete({ where: { token } })
    } catch (err) {
        throw new Error('Invalid refresh token')
    }
}

module.exports = {
    verifyToken,
    refreshToken,
    revokeRefreshToken
}
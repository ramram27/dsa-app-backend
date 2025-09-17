const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware')

// POST /api/users
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

router.post('/logout', authMiddleware, userController.logout)
module.exports = router;

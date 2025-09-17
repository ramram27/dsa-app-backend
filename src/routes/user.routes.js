const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const qauestionController = require('../controllers/question.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

// POST /api/users
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

router.post('/logout', authMiddleware, userController.logout)
router.post('/question', authMiddleware, qauestionController.questionCreate);
router.get('/getquestion', authMiddleware, qauestionController.getQuestionData)
router.get('/getquestion/:id', authMiddleware, qauestionController.getQuestionById);
router.delete('/deletequestion/:id', authMiddleware, qauestionController.deleteByIdQuestion)

module.exports = router;

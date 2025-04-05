const authRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser, adminLoginHandler } = require('../controllers/users');
const { signinValidation, signupValidation, adminValidation } = require('../utils/validation');
const auth = require('../middlewares/auth');

// Публичные роуты
authRouter.post('/signup', celebrate(signupValidation), createUser);
authRouter.post('/signin', celebrate(signinValidation), login);

// Админские роуты
authRouter.post('/admin/login', celebrate(adminValidation), adminLoginHandler);
authRouter.get('/admin/check', auth, auth.requireAdmin, (req, res) => {
  res.json({ message: 'Добро пожаловать в админ-панель' });
});

module.exports = authRouter;

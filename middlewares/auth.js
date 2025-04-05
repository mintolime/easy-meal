const jwt = require('jsonwebtoken');
const config = require('../config');
const { Unauthorized } = require('../errors');

// Основная аутентификация
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch (err) {
    next(new Unauthorized('Неверный или истекший токен'));
  }
};

// Проверка админских прав
auth.requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new Unauthorized('Требуются права администратора');
  }
  next();
};

module.exports = auth;
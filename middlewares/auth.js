const jwt = require('jsonwebtoken');
const config = require('../config');
const { Unauthorized } = require('../errors');
const ERROR = require('../utils/errorMessages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized(ERROR.LOGIN.UNAUTHORIZED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    next(new Unauthorized(ERROR.LOGIN.UNAUTHORIZED));
  }

  req.user = payload;

  return next();
};

const customError = require('../errors');
const ERROR = require('../utils/errorMessages');
const adminCheck = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new customError.Forbidden(ERROR.USER.NO_PERMISSION);
  }
  next();
};

module.exports = adminCheck;

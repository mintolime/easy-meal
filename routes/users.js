const usersRouter = require('express').Router();

const { getMe } = require('../controllers/users');

usersRouter.get('/me', getMe);

module.exports = usersRouter;

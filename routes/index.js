const router = require('express').Router();
const usersRouter = require('./users');
const recipesRouter = require('./recipes');
const auth = require('../middlewares/auth');
const authRouter = require('./auth');

router.use(authRouter);
router.use('/users', auth, usersRouter);
router.use('/recipes', auth, recipesRouter);
router.use('/*', auth);

module.exports = router;

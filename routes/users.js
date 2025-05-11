const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { likeRecipeValidation } = require('../utils/validation');

const { getMe, likeRecipe, dislikeRecipe, allUsers, deleteUser } = require('../controllers/users');
const adminCheck = require('../middlewares/adminCheck');
const auth = require('../middlewares/auth');

usersRouter.get('/me', getMe);
usersRouter.get('/usersAll', allUsers);
usersRouter.post(
  '/like/:recipeId',
  celebrate(likeRecipeValidation),
  likeRecipe
);
usersRouter.delete('/:userId', auth, adminCheck, deleteUser);
usersRouter.delete(
  '/dislike/:recipeId',
  celebrate(likeRecipeValidation),
  dislikeRecipe
);

module.exports = usersRouter;

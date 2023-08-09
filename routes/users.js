const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { likeRecipeValidation } = require('../utils/validation');

const { getMe, likeRecipe, dislikeRecipe } = require('../controllers/users');

usersRouter.get('/me', getMe);
usersRouter.post(
  '/like/:recipeId',
  celebrate(likeRecipeValidation),
  likeRecipe
);

usersRouter.delete(
  '/dislike/:recipeId',
  celebrate(likeRecipeValidation),
  dislikeRecipe
);

module.exports = usersRouter;

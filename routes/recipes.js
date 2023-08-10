const recipesRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createRecipeValidation,
  deleteRecipeValidation,
} = require('../utils/validation');

const {
  createRecipe,
  getRecipes,
  deleteRecipe,
  getRandomRecipe,
} = require('../controllers/recipes');

recipesRouter.get('/', getRecipes);
recipesRouter.get('/random', getRandomRecipe);
recipesRouter.post('/', celebrate(createRecipeValidation), createRecipe);

recipesRouter.delete(
  '/:recipeId',
  celebrate(deleteRecipeValidation),
  deleteRecipe
);

module.exports = recipesRouter;

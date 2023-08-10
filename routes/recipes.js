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
  updateRecipe,
} = require('../controllers/recipes');

recipesRouter.get('/', getRecipes);
recipesRouter.get('/random', getRandomRecipe);
recipesRouter.patch(
  '/:recipeId',
  celebrate(createRecipeValidation),
  updateRecipe
);
recipesRouter.post('/', celebrate(createRecipeValidation), createRecipe);

recipesRouter.delete(
  '/:recipeId',
  celebrate(deleteRecipeValidation),
  deleteRecipe
);

module.exports = recipesRouter;

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
} = require('../controllers/recipes');

recipesRouter.get('/', getRecipes);
recipesRouter.post('/', celebrate(createRecipeValidation), createRecipe);

recipesRouter.delete(
  '/:recipeId',
  celebrate(deleteRecipeValidation),
  deleteRecipe
);

module.exports = recipesRouter;

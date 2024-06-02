const recipesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');

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

recipesRouter.get('/', auth, getRecipes);
recipesRouter.get('/random', getRandomRecipe);
recipesRouter.patch(
  '/:recipeId',
  auth,
  celebrate(createRecipeValidation),
  updateRecipe
);
recipesRouter.post('/', auth, celebrate(createRecipeValidation), createRecipe);

recipesRouter.delete(
  '/:recipeId',
  auth,
  celebrate(deleteRecipeValidation),
  deleteRecipe
);

module.exports = recipesRouter;

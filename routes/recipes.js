const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');
// const authDeleteRecipe = require('../middlewares/authDeleteRecipe');

const {
  createRecipeValidation,
  deleteRecipeValidation,
} = require('../utils/validation');

const {
  createRecipe,
  getRecipes,
  deleteRecipe,
} = require('../controllers/recipes');

moviesRouter.get('/', getRecipes);
moviesRouter.post('/', celebrate(createRecipeValidation), createRecipe);

moviesRouter.delete(
  '/:_id',
  celebrate(deleteRecipeValidation),
  // authDeleteRecipe,
  deleteRecipe
);

module.exports = moviesRouter;

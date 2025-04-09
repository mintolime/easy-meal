const Recipe = require('../models/recipe');
const customError = require('../errors');
const ERROR = require('../utils/errorMessages');

const getRecipes = (req, res, next) => {
  Recipe.find({})
    .then((recipes) => {
      res.send(recipes);
    })
    .catch(next);
};

const getRandomRecipe = (req, res, next) => {
  Recipe.find({})
    .then((recipes) => {
      const index = Math.floor(Math.random() * recipes.length);
      const randomRecipe = recipes[index];
      res.send(randomRecipe);
    })
    .catch(next);
};

const createRecipe = (req, res, next) => {
  Recipe.create({ ...req.body })
    .then((newRecipe) => {
      res.send(newRecipe);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        console.log(error);
        next(new customError.BadRequest(ERROR.USER.INVALID_DATA));
      } else {
        next(error);
      }
    });
};

const updateRecipe = (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findByIdAndUpdate(
    recipeId,
    { ...req.body },
    { new: true, runValidators: true }
  )
    .then((updatedRecipe) => {
      res.send(updatedRecipe);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        console.log(error);
        next(new customError.BadRequest(ERROR.USER.INVALID_DATA));
      } else {
        next(error);
      }
    });
};

const deleteRecipe = (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.deleteOne({ _id: recipeId })
    .then((recipe) => {
      if (recipe.deletedCount === 0) {
        throw new customError.NotFound((ERROR.RECIPE.NOT_FOUND));
      }
      return res.send({ message: (ERROR.RECIPE.DELETED) });
    })
    .catch(next);
};

module.exports = {
  getRecipes,
  createRecipe,
  deleteRecipe,
  getRandomRecipe,
  updateRecipe,
};

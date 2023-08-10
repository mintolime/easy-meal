const Recipe = require('../models/recipe');
const customError = require('../errors');

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
      const index = Math.floor(Math.random() * (recipes.length - 1));
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
        next(new customError.BadRequest('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

const deleteRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;

  Recipe.deleteOne({ _id: recipeId })
    .then((recipe) => {
      if (recipe.deletedCount === 0) {
        throw new customError.NotFound('Рецепт с указанным id не найден.');
      }
      return res.send({ message: 'Рецепт удален :(' });
    })
    .catch(next);
};

module.exports = {
  getRecipes,
  createRecipe,
  deleteRecipe,
  getRandomRecipe,
};

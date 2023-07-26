const Recipe = require('../models/recipe');
const customError = require('../errors');

const getRecipes = (req, res, next) => {
  Recipe.find({ owner: req.user._id })
    .then((recipes) => {
      res.send(recipes);
    })
    .catch(next);
};

const createRecipe = (req, res, next) => {
  const { _id } = req.user;

  Recipe.find({ mealId: req.body.mealId })
    .then((recipes) => {
      if (recipes.length > 0) {
        const recipeId = recipes[0]._id;

        Recipe.findByIdAndUpdate(
          recipeId,
          { $addToSet: { owner: _id } },
          { new: true, runValidators: true }
        )
          .then((recipe) => res.send(recipe))
          .catch(next);
      } else {
        Recipe.create({ ...req.body, owner: _id })
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
      }
    })
    .catch(next);
};

const deleteRecipe = (req, res, next) => {
  const recipeId = req.params._id;
  const ownerId = req.user._id;

  Recipe.findByIdAndUpdate(
    recipeId,
    { $pull: { owner: ownerId } },
    { new: true, runValidators: true }
  )
    .then((recipe) => {
      res.send(recipe);
    })
    .catch(next);
};

module.exports = {
  getRecipes,
  createRecipe,
  deleteRecipe,
};

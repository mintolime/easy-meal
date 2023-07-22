/* eslint-disable operator-linebreak */
const Recipe = require('../models/recipe');
const customError = require('../errors');

module.exports = (req, res, next) => {
  Recipe.findById({ _id: req.params._id })
    .then((recipe) => {
      // console.log(recipe.owner);
      if (!recipe) {
        next(new customError.NotFound('Рецепта с указанным id не существует'));
      } else if (
        recipe.owner[recipe.owner.indexOf(req.user._id)].toHexString() !==
        req.user._id
      ) {
        next(
          new customError.Forbidden('У вас нет прав на удаление чужого рецепта')
        );
      }
      return next();
    })
    .catch(next);
};

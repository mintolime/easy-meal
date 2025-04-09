/* eslint-disable operator-linebreak */
const Recipe = require('../models/recipe');
const customError = require('../errors');

const ERROR = require('../utils/errorMessages');

module.exports = (req, res, next) => {
  Recipe.findById({ _id: req.params._id })
    .then((recipe) => {
      // console.log(recipe.owner);
      if (!recipe) {
        next(new customError.NotFound(ERROR.RECIPE.NOT_FOUND));
      } else if (
        recipe.owner[recipe.owner.indexOf(req.user._id)].toHexString() !==
        req.user._id
      ) {
        next(new customError.Forbidden(ERROR.RECIPE.NO_RULES));
      }
      return next();
    })
    .catch(next);
};

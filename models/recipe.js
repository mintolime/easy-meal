const mongoose = require('mongoose');
const { urlRegEx } = require('../utils/constants');

const recipeSchema = new mongoose.Schema(
  {
    mealAuthor: {
      type: String,
      required: false,
    },

    mealName: {
      type: String,
      required: true,
    },

    mealCategory: {
      type: String,
      required: false,
    },

    instructions: {
      type: String,
      required: true,
    },

    mealSourceUrl: {
      type: String,
      required: false,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    youtubeUrl: {
      type: String,
      required: false,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    ingredients: [],
  },
  { versionKey: false }
);

module.exports = mongoose.model('recipe', recipeSchema);

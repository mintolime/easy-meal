const mongoose = require('mongoose');
const { urlRegEx } = require('../utils/constants');

const recipeSchema = new mongoose.Schema(
  {
    mealId: {
      type: String,
      required: true,
    },

    mealName: {
      type: String,
      required: true,
    },

    mealCategory: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
      required: true,
    },

    imageLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    youtubeLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegEx.test(v),
        message: 'Невалидная ссылка',
      },
    },

    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],

    ingredients: [],
  },
  { versionKey: false }
);

module.exports = mongoose.model('recipe', recipeSchema);

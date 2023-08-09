const { Joi } = require('celebrate');
const { urlRegEx } = require('./constants');

const signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    isAdmin: Joi.boolean(),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не должен быть пустым',
    }),
  }),
};

const signupValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    isAdmin: Joi.boolean(),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не должен быть пустым',
    }),
  }),
};

const createRecipeValidation = {
  body: Joi.object({
    mealName: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    mealAuthor: Joi.string(),

    mealCategory: Joi.string(),

    instructions: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),

    mealSourceUrl: Joi.string().regex(urlRegEx),

    imageUrl: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),

    youtubeUrl: Joi.string().regex(urlRegEx),

    ingredients: Joi.array()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
  }),
};

const deleteRecipeValidation = {
  params: Joi.object({
    recipeId: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный id',
    }),
  }),
};

const likeRecipeValidation = {
  params: Joi.object({
    recipeId: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный id',
    }),
  }),
};

module.exports = {
  signinValidation,
  signupValidation,
  createRecipeValidation,
  deleteRecipeValidation,
  likeRecipeValidation,
};

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
    mealAuthor: Joi.string().allow('', null),
    mealCategory: Joi.string().allow('', null),
    instructions: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),

    mealSourceUrl: Joi.string().allow('', null).regex(urlRegEx),
    imageUrl: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),

    youtubeUrl: Joi.string().allow('', null).regex(urlRegEx),
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

const adminValidation = {
  body: Joi.object().keys({
    login: Joi.string().required()
      .min(3)
      .max(30)
      .messages({
        'string.min': 'Логин должен содержать от 3 до 30 символов',
        'string.email': 'Введен неккорректный логин',
        'any.required': 'Логин не должен быть пустой',
        'string.max': 'Логин должен содержать от 3 до 30 символов',
      }),
    password: Joi.string().required()
      .min(8)
      .max(30)
      .messages({
        'string.min': 'Пароль должен содержать от 8 до 30 символов',
        'string.max': 'Пароль должен содержать от 8 до 30 символов',
        'any.required': 'Пароль не должен быть пустым',
      }),
  }),
};

module.exports = {
  signinValidation,
  signupValidation,
  createRecipeValidation,
  deleteRecipeValidation,
  likeRecipeValidation,
  adminValidation,
};

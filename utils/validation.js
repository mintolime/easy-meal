const { Joi } = require('celebrate');
const { urlRegEx } = require('./constants');

const signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
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
    password: Joi.string().required().messages({
      'any.required': 'Пароль не должен быть пустым',
    }),
  }),
};

const createRecipeValidation = {
  body: Joi.object({
    mealId: Joi.number()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    mealName: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
      mealCategory: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    instructions: Joi.string()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    imageLink: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
    youtubeLink: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
      })
      .required(),
    ingredients: Joi.array()
      .messages({
        'any.required': 'Поле не должно быть пустым',
      })
      .required(),
  }),
};

const deleteRecipeValidation = {
  params: Joi.object({
    _id: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный id',
    }),
  }),
};

module.exports = {
  signinValidation,
  signupValidation,
  createRecipeValidation,
  deleteRecipeValidation,
};

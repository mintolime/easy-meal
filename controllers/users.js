const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');
const Recipe = require('../models/recipe');

const customError = require('../errors');

// const checkUser = (user, res) => {
//   if (!user) {
//     throw new customError.NotFound('Нет пользователя с таким id');
//   }
//   return res.send(user);
// };

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin,
      })
        .then((newUser) => {
          res.status(201).send({
            email: newUser.email,
            isAdmin: newUser.isAdmin,
          });
        })
        .catch((error) => {
          if (error.code === 11000) {
            next(
              new customError.Conflict(
                'Пользователь с такой почтой уже зарегистрирован'
              )
            );
          } else if (error.name === 'ValidationError') {
            next(
              new customError.BadRequest(
                'Некорректные данные при создании нового пользователя'
              )
            );
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new customError.Unauthorized('Неверные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(
            new customError.Unauthorized('Неверные почта или пароль')
          );
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
          expiresIn: '7d',
        });
        return res.send({ token });
      });
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .populate(['likes'])
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new customError.BadRequest(
            'Некорректные данные при создании нового пользователя'
          )
        );
      } else {
        next(error);
      }
    });
};

const likeRecipe = (req, res, next) => {
  const { _id } = req.user;
  const { recipeId } = req.params;

  User.findByIdAndUpdate(
    _id,
    { $addToSet: { likes: recipeId } },
    { new: true, runValidators: true }
  )
    .populate(['likes'])
    .then(() => {
      Recipe.findById(recipeId)
        .then((recipe) => {
          res.send(recipe);
        })
        .catch(next);
    })
    .catch(next);
};

const dislikeRecipe = (req, res, next) => {
  const { _id } = req.user;
  const { recipeId } = req.params;

  User.findByIdAndUpdate(
    _id,
    { $pull: { likes: recipeId } },
    { new: true, runValidators: true }
  )
    .then(() => {
      Recipe.findById(recipeId)
        .then((recipe) => {
          res.send(recipe);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
  getMe,
  likeRecipe,
  dislikeRecipe,
};

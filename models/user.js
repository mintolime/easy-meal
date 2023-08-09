const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    },
    
    password: {
      type: String,
      required: true,
      select: false,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipe',
        default: [],
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);

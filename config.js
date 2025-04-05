require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  CONNECT,
  ADMIN_LOGIN,
  ADMIN_PASSWORD
} = process.env;

const config = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 3003,
  jwtSecret: NODE_ENV === 'production' ? JWT_SECRET : 'not-so-secret',
  connectDbString: CONNECT || 'mongodb://127.0.0.1:27017/easymeal',
  admin: {
    login: ADMIN_LOGIN || 'admin',
    password: ADMIN_PASSWORD || 'admin123'
  }
};

module.exports = config;

const authRouter = require('express').Router();

const { createUser, login } = require('../controllers/users');
const {
  validationCreateUser,
  validationLogin,
} = require('../middlewares/validations');

authRouter.post('/signin', validationLogin, login);
authRouter.post('/signup', validationCreateUser, createUser);

module.exports = authRouter;

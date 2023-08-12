const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  codeCreated, messageError,
} = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(codeCreated.OK).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getMeProfile = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.notFoundError);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const updateMeProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.notFoundError);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports = {
  createUser, updateMeProfile, login, getMeProfile,
};

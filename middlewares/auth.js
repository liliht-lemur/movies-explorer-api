const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const {
  messageError,
} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorizedError(messageError.unauthorized));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    next(new UnAuthorizedError(messageError.unauthorized));
  }

  req.user = payload;

  return next();
};

module.exports = auth;

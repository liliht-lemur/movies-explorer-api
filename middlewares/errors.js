const {
  codeError, messageError,
} = require('../errors/errors');

const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = codeError.SERVER_ERROR, message } = err;

  if (err.code === 11000) {
    res.status(codeError.CONFLICT).send({ message: messageError.conflictMessage });
    return;
  }
  if (statusCode === codeError.SERVER_ERROR) {
    res.status(statusCode).send({ message: messageError.defaultError });
    return;
  }

  res.status(statusCode).send({ message });

  next();
};
module.exports = centralizedErrorHandler;

// централизованный обработчик ошибок

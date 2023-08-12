const codeSuccess = {
  OK: 200,
};
const codeCreated = {
  OK: 201,
};
const codeError = {
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  FORBIDDEN: 403,
};
const messageSuccess = {
  okMessage: 'Действие выполнено.',
};
const messageError = {
  badDataError: 'Переданы некорректные данные.',
  defaultError: 'Ошибка по умолчанию.',
  notFoundError: 'Данные по указанному _id не найдены.',
  unauthorized: 'Ошибка авторизации',
  conflictMessage: 'Пользователь с указанными данными уже существует',
  forbiddenMessage: 'Отсутствует доступ',
};

module.exports = {
  codeSuccess, codeCreated, codeError, messageSuccess, messageError,
};

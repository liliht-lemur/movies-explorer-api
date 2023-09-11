const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const {
  messageError,
} = require('./errors/errors');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');

const centralizedErrorHandler = require('./middlewares/errors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());

mongoose.connect(DB_URL);

app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
app.use('/', authRouter);

app.use((req, res, next) => {
  next(new NotFoundError(messageError.notFoundError));
});
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(centralizedErrorHandler); // централизованный обработчик ошибок
app.listen(PORT, () => console.log('Server started'));

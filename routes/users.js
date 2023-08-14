const usersRouter = require('express').Router();

const {
  updateMeProfile, getMeProfile,
} = require('../controllers/users');
const {
  validationUpdateUser,
} = require('../middlewares/validations');

usersRouter.get('/me', getMeProfile);
usersRouter.patch('/me', validationUpdateUser, updateMeProfile);

module.exports = usersRouter;

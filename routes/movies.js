const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const {
  validationCreateMovie, validationId,
} = require('../middlewares/validations');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validationCreateMovie, createMovie);
moviesRouter.delete('/:id', validationId, deleteMovie);

module.exports = moviesRouter;

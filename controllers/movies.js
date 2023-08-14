const Movie = require('../models/movie');
const {
  codeSuccess, codeCreated, messageError, messageSuccess,
} = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(codeSuccess.OK).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((card) => res.status(codeCreated.OK).send(card))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messageError.notFoundError);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(messageError.forbiddenMessage);
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            res.send({ message: messageSuccess.okMessage });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};

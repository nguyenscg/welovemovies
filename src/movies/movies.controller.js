const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const data = await moviesService.list(); // execute knex query to list all movies
    res.json({ data });
}

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movie_id);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res) {
    const { movie } = res.locals;
    res.json({ movie });
}

async function getTheaters(req, res) {
    const { movieId } = req.params;
    const theaters = await moviesService.getTheaters(movieId)
    res.json({ data: theaters });
}

async function getReviews(req, res) {
    const { movieId } = req.params;
    const reviews = await moviesService.getReviews(movieId);
    res.json({ data: reviews });
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), read],
    list: asyncErrorBoundary(list),
    getReviews,
    getTheaters,
};
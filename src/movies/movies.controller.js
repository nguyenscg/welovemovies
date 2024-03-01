const moviesService = require("./movies.service");

function list(req, res, next) {
    moviesService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

function movieExists(req, res, next) {
    moviesService
    .read(req.params.movieId)
    .then((movie) => {
        if (movie) {
            res.locals.movie = movie;
            return next();
        }
        next({ status: 404, message: `Movie cannot be found.` })
    });
}

function read(req, res) {
    const { movie } = res.locals;
    res.json({ movie });
}


module.exports = {
    read: [movieExists, read],
    list,
};
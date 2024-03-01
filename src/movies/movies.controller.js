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
    })
    .catch(next);
}

function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data });
}


module.exports = {
    read: [movieExists, read],
    list,
};
const moviesService = require("./movies.service");

async function list(req, res) {
    const data = await moviesService.list(); // execute knex query to list all movies
    res.json({ data });
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
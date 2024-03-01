const moviesService = require("./movies.service");

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

function read(req, res) {
    const { movie } = res.locals;
    res.json({ movie });
}


module.exports = {
    read: [movieExists, read],
    list,
};
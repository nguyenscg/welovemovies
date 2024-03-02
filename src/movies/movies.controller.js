const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// async function list(req, res) {
//     const data = await moviesService.list(); // execute knex query to list all movies
//     res.json({ data });
// }

async function list(req, res, next) {
    const isShowing = req.query.is_showing
   if (isShowing) { // if the movie is being shown in theaters, only list those movies
      res.json({ data: await service.listMovie() })
   } else {
       res.json({ data: await service.list() }) // otherwise list all the movies
   }
}

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId); // query the movie_id
    if (movie) {  // if the movie ID is found and matches
        res.locals.movie = movie; // store movie into res.locals
        return next();
    }
    next({ status: 404, message: 'Movie cannot be found.' });
}

async function read(req, res) {
    // const { movie } = res.locals; // destructure res.locals of movie
    res.json({ data: res.locals.movie }); // get movie
}

async function getTheaters(req, res) {
    const { movieId } = req.params;
    const theaters = await service.getTheaters(movieId)
    res.json({ data: theaters });
}

async function getReviews(req, res) {
    const { movieId } = req.params;
    const reviews = await service.getReviews(movieId);
    res.json({ data: reviews });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    getReviews,
    getTheaters,
};
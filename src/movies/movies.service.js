const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

// This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.
function list() { // GET /movies endpoint
    return knex('movies') // knex query movies table
        .select('*') // select all columns
        .groupBy('movies.movie_id') // group movies by movie_id
}

// this route will return a movie
function listMovie() { 
    return knex('movies as m') // knex query movies table and alias to m
        .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id') // join movies_theaters table by ids from each table
        .select('m.*') // select all columns in movies table
        .where({ 'mt.is_showing': true }) // where the movies_table is_showing column is true
        .groupBy('m.movie_id') // group the movies by movie ID
}

// READ one movie
// this route will return a single movie by ID
/* four cases to consider
- `GET /movies/:movieId`
- `GET /movies/:movieId` (incorrect ID)
- `GET /movies/:movieId/theaters`
- `GET /movies/:movieId/reviews` */
function read(movie_id) { // GET /movies/:movieId endpoint
    return knex('movies') // knex query movies table
        .select('*') // select all columns
        .where({ movie_id })
        .first()
}


// GET /movies?is_showing=true
// In the event where `is_showing=true` is provided, the route should return _only those movies where the movie is currently showing in theaters._ This means you will need to check the `movies_theaters` table.
function getMoviesShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.movie_id",
            "m.title",
            "m.runtime_in_minutes",
            "rating",
            "description",
            "image_url")
    .where({ is_showing: true })
}

// GET /movies/:movieId/theaters
// this route should return all 'theaters' where the movie is playing. that means you need to check 'movies_theaters' table
function getTheaters(movie_id) {
    return knex("movies as m") // select movies and alias as m
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id") // join movies theater with alias mt, link mt.movie_id and m.movie_id keys
    .join("theaters as t", "t.theater_id", "mt.theater_id") // join theaters table and link theater_id and mt.theater_id
    .select("t.*", "mt.movie_id", "mt.is_showing") // select all columns in theater, movie_id in moviesTheaters, and movieTheaters is showing
    .where({ "mt.movie_id": movie_id })
}

// GET /movies/:movieId/reviews
// this route should return all the 'reviews' for the movie, including all the 'critic' details added to a 'critic' key of the review
function getReviews(movie_id) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
    .where({ "r.movie_id": movie_id })
    .then(reviews => reviews.map(review => ({
        ...review,
        critic: {
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name
        }
      })));
}

module.exports = {
    list,
    listMovie,
    read,
    getMoviesShowing,
    getTheaters,
    getReviews
}
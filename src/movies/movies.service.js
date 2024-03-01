const knex = require("../db/connection"); // requires Knex instance that is initialized in db/connection.js

// This route will return a list of all movies. Different query parameters will allow for limiting the data that is returned.
function list() { // GET all /movies endpoint
    return knex("movies").select("*"); // knex query from movies table and return list of all movies
}

function read(movie_id) { // GET /movies/:movieId endpoint
    return knex("movies").select("*").where({ movie_id }).first();
}


// GET /movies?is_showing=true
// In the event where `is_showing=true` is provided, the route should return _only those movies where the movie is currently showing in theaters._ This means you will need to check the `movies_theaters` table.

// READ one movie
// this route will return a single movie by ID
/* four cases to consider
- `GET /movies/:movieId`
- `GET /movies/:movieId` (incorrect ID)
- `GET /movies/:movieId/theaters`
- `GET /movies/:movieId/reviews` */

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
module.exports = {
    list,
    read,
    getTheaters,
}
const knex = require("../db/connection"); // require connection file to enable knex

// This route will return a list of all theaters. Different query parameters will allow for additional information to be included in the data that is returned.
// GET /theaters
// Get all theaters

function list() {
    return knex("theaters") // knex query theaters table
        .select("*") // select all columns
        // .groupBy("theaters.theater_id"); // group by theater id
}

// This route should return all the `theaters` and, the movies playing at each theatre added to the `movies` key. This means you will need to check the `movies_theaters` table.
function listMovies(theater_id) {
    return knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .where({ theater_id: theater_id })
        .select("m.*", "mt.created_at", "mt.updated_at", "mt.is_showing", "mt.theater_id")
}

module.exports = {
    list,
    listMovies,
}



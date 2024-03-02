const knex = require("../db/connection");

// update /reviews/:reviewId
// first make a read function to read the review_id
// make an update function
// also need to get critic to update the reviews with: so create get critic function

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": review_id })
        .first();
}

function update() {

}

module.exports = {
    read,
    update,
}
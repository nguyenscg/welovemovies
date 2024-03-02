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

// get critic for each review
function getCritic(critic_id) {
    return knex("critics") // query critics table
        .select("*")
        .where({ "critic_id": critic_id })
}

/*  Hint: Since the test requires a PUT method, you can update the review in the following manner:
```js
const updatedReview = {
  ...response.locals.review,
  ...request.body.data,
  review_id: response.locals.review.review_id,
};
const data = await service.update(updatedReview); */

function update(updatedReview) {
    return knex("reviews") // reviews table
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*");
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

module.exports = {
    read,
    update,
    getCritic,
    delete: destroy,
}
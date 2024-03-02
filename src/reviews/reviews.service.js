const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    c_critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    c_created_at: "critic.created_at",
    c_updated_at: "critic.updated_at",
  });

// update /reviews/:reviewId
// first make a read function to read the review_id
// make an update function
// also need to get critic to update the reviews with: so create get critic function

function read(review_id) {
    return knex("reviews") // knex query reviews table
        .select("*") // select all columns
        .where({ review_id: review_id }) // filter results where 'review_id' matches argument
        .first(); // returns the first
}

// get critic for each review
function getCritic(critic_id) {
    return knex("critics") // query critics table
        .select("*")
        .where({ critic_id: critic_id })
}

// Create a route that responds to the following request: PUT /reviews/:reviewId
// The response should include the entire review record with the newly patched content, and the critic information set to the `critic` property.

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
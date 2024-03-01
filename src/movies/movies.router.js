const router = require("express").Router(); // require express router instance
const controller = require("./movies.controller"); // require movies controller
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:movieId/theaters")
  .get(controller.getReviews);

router
  .route("/:movieId/reviews")
  .get("controller.getTheaters");

router
    .route("/") // GET /movies endpoint
    .get(controller.list);

router 
    .route("/:movieId") // GET /movies/:movieId endpoint
    .get(controller.read);

// GET movies
/* ```json
{
    "data": [
      {
        "id": 1,
        "title": "Spirited Away",
        "runtime_in_minutes": 125,
        "rating": "PG",
        "description": "Chihiro ...",
        "image_url": "https://imdb-api.com/..."
      }
      // ...
    ]
  } 
  */

// GET /movies?is_showing=true
// In the event where `is_showing=true` is provided, the route should return _only those movies where the movie is currently showing in theaters._ This means you will need to check the `movies_theaters` table.
module.exports = router;
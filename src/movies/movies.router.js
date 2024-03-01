const router = require("express").Router(); // require express router instance
const controller = require("./movies.controller"); // require movies controller
const methodNotAllowed = require("../errors/methodNotAllowed");

router // GET /movies endpoint
  .route("/") 
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:movieId") // GET /movies/:movieId endpoint
  .get(controller.read);

router
  .route("/:movieId/theaters")
  .get(controller.getTheaters);

router
  .route("/:movieId/reviews")
  .get(controller.getReviews);


module.exports = router;
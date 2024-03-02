const router = require("express").Router(); // require express router instance
const controller = require("./movies.controller"); // require movies controller
const methodNotAllowed = require("../errors/methodNotAllowed");

router // GET /movies endpoint
  .route("/") 
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:movieId") // GET /movies/:movieId endpoint
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/:movieId/theaters") // GET /movies/:movieId/theaters endpoint
  .get(controller.getTheaters)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews") // GET /movies/:movieId/reviews endpoint
  .get(controller.getReviews)
  .all(methodNotAllowed);


module.exports = router;
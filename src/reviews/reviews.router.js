const router = require("express").Router();
const controller = require("./reviews.controller"); // require reviews controller file
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .delete(controller.delete)
    .put(controller.update)
    .all(methodNotAllowed)

module.exports = router;
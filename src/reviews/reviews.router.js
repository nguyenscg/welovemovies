const router = require("express").Router();
const controller = require("./reviews.controller"); // require reviews controller file
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

module.exports = router;
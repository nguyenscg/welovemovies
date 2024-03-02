const router = require("express").Router();
const controller = require("./theaters.controller"); // require theaters controller file
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;
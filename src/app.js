if (process.env.DATABASE_URL) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const moviesRouter = require("./movies/movies.router");

app.use(cors()); // enable cors for app to use
app.use(express.json());

app.use("/", router);
app.use("/movies", moviesRouter);

app.use((req, res, next) => { // if a request is made to a route that does not exist, server returns a 404 error
    next({ status: 404, message: "That page doesn't exist."});
});

app.use((error, req, res, next) => {
    const { status = 500, message = "Something went wrong on our end!" } = err;
    res.status(status).json({ error: message });
});


module.exports = app;

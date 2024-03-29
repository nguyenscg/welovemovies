if (process.env.DATABASE_URL) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors"); // require cors
const router = express.Router();
const moviesRouter = require("./movies/movies.router"); // require movies router
const reviewsRouter = require("./reviews/reviews.router"); // require reviews router
const theatersRouter = require("./theaters/theaters.router"); // require theaters router

app.use(cors()); // enable cors for app to use
app.use(express.json());


app.use("/", router);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use((req, res, next) => { // if a request is made to a route that does not exist, server returns a 404 error
    next({ status: 404, message: "That page doesn't exist." });
});
  
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong on our end!" } = err;
    res.status(status).json({ error: message });
});


module.exports = app;

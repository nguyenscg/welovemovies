if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const moviesRouter = require("./movies/movies.router");


module.exports = app;

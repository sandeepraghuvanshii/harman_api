// models/index.js
const mongoose = require("mongoose");
const Movie = require("./Movie");
const TVShow = require("./TVShow");

module.exports = {
  Movie,
  TVShow,
};

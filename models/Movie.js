// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    required: false,
  },
  backdrop_path: {
    type: String,
  },
  belongs_to_collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
  },
  budget: {
    type: Number,
    required: false,
  },
  genres: [
    {
      id: {
        type: Number,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
    },
  ],
  homepage: {
    type: String,
  },
  id: {
    type: Number,
    required: false,
    unique: true,
  },
  imdb_id: {
    type: String,
    required: false,
  },
  origin_country: [
    {
      type: String,
      required: false,
    },
  ],
  original_language: {
    type: String,
    required: false,
  },
  original_title: {
    type: String,
    required: false,
  },
  overview: {
    type: String,
    required: false,
  },
  popularity: {
    type: Number,
    required: false,
  },
  poster_path: {
    type: String,
  },
  production_companies: [
    {
      id: {
        type: Number,
        required: false,
      },
      logo_path: {
        type: String,
      },
      name: {
        type: String,
        required: false,
      },
      origin_country: {
        type: String,
        required: false,
      },
    },
  ],
  production_countries: [
    {
      iso_3166_1: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
    },
  ],
  release_date: {
    type: Date,
    required: false,
  },
  revenue: {
    type: Number,
    required: false,
  },
  runtime: {
    type: Number,
    required: false,
  },
  spoken_languages: [
    {
      english_name: {
        type: String,
        required: false,
      },
      iso_639_1: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
    },
  ],
  status: {
    type: String,
    required: false,
  },
  tagline: {
    type: String,
  },
  title: {
    type: String,
    required: false,
  },
  video: {
    type: Boolean,
    required: false,
  },
  vote_average: {
    type: Number,
    required: false,
  },
  vote_count: {
    type: Number,
    required: false,
  },
  play_links: [
    {
      qualtiy_low: {
        type: Object,
        required: false,
      },
      qualtiy_medium: {
        type: Object,
        required: false,
      },
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

const mongoose = require("mongoose");

// Define the TvShow model
const tvShowSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  created_by: [
    {
      id: Number,
      credit_id: String,
      name: String,
      original_name: String,
      gender: Number,
      profile_path: String,
    },
  ],
  episode_run_time: [Number],
  first_air_date: Date,
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  homepage: String,
  id: Number,
  in_production: Boolean,
  languages: [String],
  last_air_date: Date,
  last_episode_to_air: {
    id: Number,
    name: String,
    overview: String,
    vote_average: Number,
    vote_count: Number,
    air_date: Date,
    episode_number: Number,
    episode_type: String,
    production_code: String,
    runtime: Number,
    season_number: Number,
    show_id: Number,
    still_path: String,
  },
  name: String,
  next_episode_to_air: {
    id: Number,
    name: String,
    overview: String,
    vote_average: Number,
    vote_count: Number,
    air_date: Date,
    episode_number: Number,
    episode_type: String,
    production_code: String,
    runtime: Number,
    season_number: Number,
    show_id: Number,
    still_path: String,
  },
  networks: [
    {
      id: Number,
      logo_path: String,
      name: String,
      origin_country: String,
    },
  ],
  number_of_episodes: Number,
  number_of_seasons: Number,
  origin_country: [String],
  original_language: String,
  original_name: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  production_companies: [
    {
      id: Number,
      logo_path: String,
      name: String,
      origin_country: String,
    },
  ],
  production_countries: [
    {
      iso_3166_1: String,
      name: String,
    },
  ],
  seasons: [
    {
      air_date: Date,
      episode_count: Number,
      id: Number,
      name: String,
      overview: String,
      poster_path: String,
      season_number: Number,
      vote_average: Number,
    },
  ],
  spoken_languages: [
    {
      english_name: String,
      iso_639_1: String,
      name: String,
    },
  ],
  status: String,
  tagline: String,
  type: String,
  vote_average: Number,
  vote_count: Number,
});

const TVShow = mongoose.model("TVShow", tvShowSchema);
module.exports = TVShow;

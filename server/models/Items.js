const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  backdrop_path: { type: String, required: true },
  poster_path: { type: String, required: true },
  original_language: { type: String},
  original_title: { type: String},
  overview: { type: String},
  poster_path: { type: String},
  release_date: { type: Date},
  vote_average: { type: String},
  imdb_id: { type: String},
  status: { type: String},
  category: { type: String},
  tags: { type: String},
  is_popular: { type: Boolean },
  is_featured: { type: Boolean },
  is_movie: { type: Boolean },
});

const User = mongoose.model("Items", userSchema);

module.exports = Items;

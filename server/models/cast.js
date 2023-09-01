const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
  adult: Boolean,
  gender: Number,
  id: Number,
  known_for_department: String,
  name: String,
  original_name: String,
  popularity: Number,
  profile_path: String,
  cast_id: Number,
  character: String,
  credit_id: String,
  order: Number,
});

const castListSchema = new mongoose.Schema({
  id: Number,
  results: [castSchema],
});

module.exports = mongoose.model("CastList", castListSchema);

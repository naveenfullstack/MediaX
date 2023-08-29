const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: String,
  key: String,
  site: String,
  size: Number,
  type: String,
  official: Boolean,
});

const videoListSchema = new mongoose.Schema({
  id: Number,
  results: [videoSchema],
});

module.exports = mongoose.model("VideoList", videoListSchema);

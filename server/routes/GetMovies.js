const express = require("express");
const axios = require("axios");
const router = express.Router();
const movieData = require("../demodata/MovieVideos.json");
const Data = require("../demodata/PopularMovies.json")

// TMDb API key
const apiKey = "922f2e7560f506fe1b6689418dd8260c";

//fetch movies from TMDb
router.get("/popular", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

router.get("/", (req, res) => {
  res.json(Data);
});

router.get("/videos/:id", (req, res) => {
  const movieId = parseInt(req.params.id);

  // Find the movie data by ID
  const movie = movieData.find((m) => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // Return the movie's results
  res.json(movie.results);
});

module.exports = router;

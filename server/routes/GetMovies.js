const express = require("express");
const axios = require("axios");
const router = express.Router();

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

router.get("/toprated", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
    );
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

router.get("/nowplaying", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=2`
    );
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

router.get("/horror", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`
    );
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

router.get("/Upcoming", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
    );
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

module.exports = router;

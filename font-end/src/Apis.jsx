//const Bearer = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjJmMmU3NTYwZjUwNmZlMWI2Njg5NDE4ZGQ4MjYwYyIsInN1YiI6IjY0ZGI5YzYyMDAxYmJkMDQxYzhmNWY1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BhwtgPLMHNQDlrcM1CmY-StCqJWjpbexvxtx9zXzaRo";
const key = "922f2e7560f506fe1b6689418dd8260c";
const Domain = "http://192.168.1.4:3001"

const requests = {
  Popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  // requestNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`,
  login : `${Domain}/auth/client/login`,
};

export default requests;
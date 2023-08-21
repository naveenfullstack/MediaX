const Domain = "http://localhost:3001"

const requests = {

  //Headers
  key : "eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsIm",
  authantication : "mediax_backend",

  //API Urls
  Popular: `${Domain}/getmovies/popular`,
  requestTopRated: `${Domain}/getmovies/toprated`,
  requestNowPlaying: `${Domain}/getmovies/nowplaying`,
  requestHorror: `${Domain}/getmovies/horror`,
  requestUpcoming: `${Domain}/getmovies/Upcoming`,
  login : `${Domain}/login`
};

export default requests;
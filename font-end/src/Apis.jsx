const Domain = "https://media-x.vercel.app"

const requests = {

  //Headers
  key : process.env.REACT_APP_API_KEY,
  authantication : process.env.REACT_APP_AUTHANTICATION,

  //API Urls
  Domain : `https://media-x.vercel.app`,
  Popular: `${Domain}/getmovies/popular`,
  requestTopRated: `${Domain}/getmovies/toprated`,
  requestNowPlaying: `${Domain}/getmovies/nowplaying`,
  requestHorror: `${Domain}/getmovies/horror`,
  requestUpcoming: `${Domain}/getmovies/Upcoming`,
  login : `${Domain}/login`
};

export default requests;
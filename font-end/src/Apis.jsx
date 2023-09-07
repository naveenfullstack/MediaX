//const Domain = "https://media-x.vercel.app"
const Domain = "http://192.168.1.8:9001"

const requests = {

  //Headers
  key : process.env.REACT_APP_API_KEY,
  authantication : process.env.REACT_APP_AUTHANTICATION,

  //API Urls
  //Domain : `https://media-x.vercel.app`,
  Domain : `http://192.168.1.8:9001`,
  Local_Domain : `localhost:9001`,
  ForgetPassword : `${Domain}/auth/forgotpassword`,
  Popular: `${Domain}/shows/get-all-shows`,
  requestTopRated: `${Domain}/getmovies/toprated`,
  requestNowPlaying: `${Domain}/getmovies/nowplaying`,
  requestHorror: `${Domain}/getmovies/horror`,
  requestUpcoming: `${Domain}/getmovies/Upcoming`,
  login : `${Domain}/login`
};

export default requests;
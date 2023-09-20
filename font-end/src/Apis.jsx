const Domain = process.env.REACT_APP_DOMAIN
const requests = {

  //Headers
  key : process.env.REACT_APP_API_KEY,
  authantication : process.env.REACT_APP_AUTHANTICATION,

  //API Urls
  Domain : process.env.REACT_APP_DOMAIN,
  ForgetPassword : `${Domain}/auth/forgotpassword`,
  Popular: `${Domain}/shows/get-all-shows`,
  requestTopRated: `${Domain}/getmovies/toprated`,
  requestNowPlaying: `${Domain}/getmovies/nowplaying`,
  requestHorror: `${Domain}/getmovies/horror`,
  requestUpcoming: `${Domain}/getmovies/Upcoming`,
  login : `${Domain}/login`,
  signup : `${Domain}/signup`,
  mylist : `${Domain}/auth/getmylist`
};

export default requests;
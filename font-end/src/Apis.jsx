const Domain = process.env.REACT_APP_DOMAIN
const requests = {

  //Headers
  key : process.env.REACT_APP_API_KEY,
  authantication : process.env.REACT_APP_AUTHANTICATION,

  //API Urls
  Domain : process.env.REACT_APP_DOMAIN,
  ForgetPassword : `${Domain}/mediax/auth/forgotpassword`,
  Popular: `${Domain}/mediax/shows/get-all-shows`,
  requestTopRated: `${Domain}/mediax/getmovies/toprated`,
  requestNowPlaying: `${Domain}/mediax/getmovies/nowplaying`,
  requestHorror: `${Domain}/mediax/getmovies/horror`,
  requestUpcoming: `${Domain}/mediax/getmovies/Upcoming`,
  login : `${Domain}/mediax/auth/login`,
  signup : `${Domain}/mediax/auth/signup`,
  mylist : `${Domain}/mediax/auth/getmylist`
};

export default requests;
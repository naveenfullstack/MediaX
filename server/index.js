// Import packages
const express = require("express");
const home = require("./routes/home");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Database

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ,{
  useNewUrlParser: true,
  useUnifiedTopology: true ,
})
  .then( () => {
      console.log('Connected to the MongoDB database')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. n${err}`);
  })

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

const ReqDomain = require ('./middlewares/ReqDomain')
app.use(ReqDomain);

const ReqIp = require ('./middlewares/ReqIp')
app.use(ReqIp);

const Headers = require ('./middlewares/Headers')

// Routes
app.use("/test", home);

const TestData = require('./routes/TestData');
app.use('/', TestData);

const GetMovies = require('./routes/GetMovies');
app.use('/getmovies/', Headers, GetMovies);

const Login = require('./routes/auth/Login');
app.use('/login/', Headers, Login);

const Signup = require('./routes/auth/signup');
app.use('/signup/', Headers, Signup);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));

// Import packages
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Database

const connectToDatabase = require('./databses/mainmongo');
connectToDatabase();

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

const TestData = require('./routes/TestData');
app.use('/', TestData);

const GetMovies = require('./routes/GetMovies');
app.use('/getmovies/', Headers, GetMovies);

const Login = require('./routes/auth/Login');
app.use('/login/', Headers, Login);

const Signup = require('./routes/auth/signup');
app.use('/signup/', Headers, Signup);

const ForgetPassword = require('./routes/auth/forgetpassword');
app.use('/auth/', Headers, ForgetPassword);

const UserDetails = require('./routes/auth/getuserdetails');
app.use('/auth/', Headers, UserDetails);

const MyList = require('./routes/auth/mylist');
app.use('/auth/', Headers, MyList);

const Videos = require('./routes/Videos');
app.use('/videos/', Headers, Videos);

const Shows = require('./routes/Shows');
app.use('/shows/', Headers, Shows);

const Cast = require('./routes/cast');
app.use('/cast/', Headers, Cast);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));

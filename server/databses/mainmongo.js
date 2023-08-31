const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
};

module.exports = connectToDatabase;

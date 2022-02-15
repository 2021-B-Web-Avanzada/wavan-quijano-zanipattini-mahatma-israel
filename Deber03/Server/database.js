const mongoose = require('mongoose');
require("dotenv/config");

// Database connection
const uri = process.env.MongoDB
mongoose.connect(uri)
    .then(() => {console.log('Successfully connected to MongoDB!')})
    .catch(err => {console.log(err)});

module.exports = mongoose;
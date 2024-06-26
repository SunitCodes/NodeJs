const mongoose = require('mongoose');
require('dotenv').config();

// Define Mongodb connection url
const MongoURL = process.env.MongoURL;

// Setup Mongodb connection

mongoose.connect(MongoURL /*, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}*/);

//Get the default connection

const db = mongoose.connection;


// Event Listeners

db.on('connected', ()=>{
    console.log("Connected to MongoDB server");
})

db.on('disconnected', ()=>{
    console.log("Disconnected from MongoDB server");
})

db.on('error', ()=>{
    console.log("Connection failed due to an error", err);
})

module.exports = db ; // Exporting database file to index,js
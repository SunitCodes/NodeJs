const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

require('dotenv').config(); 


// Middleware for authentication
app.use(passport.initialize()); 
const LocalAuthMiddleware = passport.authenticate('local',{session: false});


app.get('/',function(req,res){
    res.send("Welcome to Student's Database");
})


//Routes for person's primary data
const personRoutes = require('./routes/personRoutes');
app.use('/person' , personRoutes);

const infoRoute = require('./routes/informationRoute');
app.use('/information', LocalAuthMiddleware, infoRoute);

const PORT = process.env.PORT || 3000; // Will fetch port number from .env file else will run on port 3000

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
})


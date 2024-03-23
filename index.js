const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth');

const app = express();

app.use(bodyParser.json());


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


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})
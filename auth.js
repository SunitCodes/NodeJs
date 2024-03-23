const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const Info = require('./models/result');


passport.use(new passportLocal(async (Username,Password,done)=>{
    //authentication logic
    try{
        const User = await Info.findOne({college_id: Username});
        
        if(!User)
            return done(null,false, {message: "Incorrect Username"});

        const isPasswordMatch = User.password === Password ? true : false ;
        if(!isPasswordMatch)
            return done(null,false, {message: "Invalid Password"});
        else
            return done(null, User, {message: "User Authenticated"});
        
    }catch(err){
        return done(res.status(401).json({message: "Internal Server Error"}));
    }
}))

module.exports = passport;
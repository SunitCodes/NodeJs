const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})


UserSchema.pre('save',async function(next){
    const user = this; 

    if(!user.isModified('password'))
        return next();
    
    try{
        // Hash generation
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        //override the plain password
        user.password = hashedPassword;
        next();
        
    }catch(err){
        return next(err);
    }
})

UserSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}


const User = mongoose.model('User',UserSchema);

module.exports = User;
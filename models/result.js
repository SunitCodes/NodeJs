const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Creating Schema
const resultSchema = new mongoose.Schema({
    college_id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        default: 5
    },
    stream: {
        type: String,
        enum: ["EE","CSE","ECE","ME","AUE"]
    },
    is_passed: {
        type: Boolean,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    }
 
})


//Password Hashing
// pre is a middleware function which executes before any save operation in database
resultSchema.pre('save',async function(next){
    const user = this; //user will contain all the data related to the person whose password will be modified

    //Hash only if the password is modified or it is new
    //If an existind user want to update(save) his existing information the middleware will execute
    //but we dont want to hash any information other than password
    if(!user.isModified('password'))
        return next();
    
    try{
        console.log("yess")
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

// This function will check if password matches the existing hashed password stored in database
resultSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}


const Result = mongoose.model('Result',resultSchema);

module.exports = Result ;
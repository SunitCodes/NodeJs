const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
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


const signUp = mongoose.model('signUp',signUpSchema);

module.exports = signUp;
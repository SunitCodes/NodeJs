const mongoose = require('mongoose');

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

const Result = mongoose.model('Result',resultSchema);

module.exports = Result ;
const mongoose = require('mongoose');

// Creating Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true //it means while entering details name is must
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ["student","teacher","staff"], // The person has to be anyone among this 3
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // two person cannot enter same enail address
    },
    address: {
        type: String,
    }

})


// Creating model

const Person = mongoose.model('Person',personSchema);

module.exports = Person ;
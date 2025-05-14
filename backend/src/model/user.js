const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true ,
        minLength:3,
        maxLength:30
    },
    password: {
        type: String,
        required: true,
        minLength:6
    },
    email :{ 
        type: String, 
        required: true,
        unique:true,
        trim:true,
    },
});

const User = mongoose.model('User', user);

module.exports = User;
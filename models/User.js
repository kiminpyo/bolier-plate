const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        minLength: 5
    },
    password:{
        type: String,
        maxlength: 50
    },
    lastname: {
        type:String,
        maxLength: 50    
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User}
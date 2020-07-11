const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String,
})

const User = mongoose.model('user',userSchema);

module.exports = User;
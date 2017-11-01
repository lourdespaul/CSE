const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    mobile:{no:{type:String}}
});

const User = mongoose.model('user', userSchema);

module.exports = User;

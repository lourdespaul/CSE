const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    code: String,
    description: String,
})

const Role = mongoose.model('role', roleSchema);

module.exports = Role;
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    code: { type: String, unique: true, required:true },
    description: { type:String, required: true },
    name: { type: String, unique: true, required: true }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
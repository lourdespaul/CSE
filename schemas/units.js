const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    higherunit: String,
    lowerunit: String,
    difference: Number
});

const Units = mongoose.model('unit', unitSchema);

module.exports = Units;
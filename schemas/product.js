const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const productSchema = new mongoose.Schema({
    name: [{ type: String, trim:true }],
    commanName: [{ type: String, trim:true }],
    category: [{type:mongoose.Schema.Types.ObjectId, ref:'category'}],
    description: String,
    manufacturer: String,
    price: [{
        amount: { type: Float },
        deft: Boolean
    }],
    units: { type: mongoose.Schema.Types.ObjectId, ref: 'units' },
    barcode: String,
    createdAt: {type: Date, default: Date.now}
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
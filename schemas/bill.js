const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);


const billSchema = new mongoose.Schema({
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' },
    //customer: {type:mongoose.Schema.Types.ObjectId, ref:'customer'},
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        price: { type: Float },
        quantity: { type: Float },
        subtotal: { type: Float },
    }],
    total: { type: Float },
    createdAt: { type: Date, default: Date.now }
});

const Bill = mongoose.model('bill', billSchema);

module.exports = Bill;

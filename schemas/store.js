const mongoose = require('mongoose');
const _ = require('lodash');
const Float = require('mongoose-float').loadType(mongoose);

const storeSchema = new mongoose.Schema({
    name: { type:String, required: true, trim:true },
    address: { type:String, required: true, trim:true },
    createdAt: { type: Date, default: Date.now },
    mobile: {
        no: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /\d{10}/.test(v)
                },
                message:'{VALUE} is not a valid phone number'
            }
        },
        verified: { type: Boolean, default: false },
    },
    password:{type: String},
    products:[{
        price: Float,
        barcode: String,
        item:{type:mongoose.Schema.Types.ObjectId, ref:'product'},
        stock:{type: Number},
        addedAt:{type:Date, default: Date.now}
    }],
    orders:[{
        products:[{type:mongoose.Schema.Types.ObjectId, ref:'product'}],
        customer:{type:mongoose.Schema.Types.ObjectId, ref:'users'}
    }]    
});

const Store = mongoose.model('store', storeSchema);

module.exports = Store;
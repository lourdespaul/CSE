const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Store = require('../../schemas/store');
const _ = require('lodash');

function requireAuth(req, res, next){
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, "kingking", function(err, decoded) {
            if (err) res.json({ success: false, message: 'Failed to authenticate token.' });
            else {
                Store.findById(decoded._doc._id, (err, store) => {
                    req.store = store;
                    next();
                });
            }
        });
    }
    else{
        res.json("Token needed")
    }
};

router.use(requireAuth);

router.post('/store/add-products',(req,res)=>{
    const item = req.body;
    Store.findOne({_id:req.store._id})
    .where('products.item').ne(item.product)
    .exec((err,store)=>{
        if(store){
            Store.findByIdAndUpdate(req.store._id,{$push:{
                products:{
                    "price": item.price,
                    "barcode": item.barcode,
                    "item": item.product,
                }
            }}).exec((err,modified)=>{
                res.json(modified);
            });
        }
        else{
            res.json("Product exists");
        }
    });
});

router.get('/store/products',(req,res)=>{
    Store.findById(req.store._id)
    // .populate('products.item')
    .populate({path: 'products.item'})
    // .sort('-product.createdAt')
    .exec((err, store)=>{
        if(err) res.json(err);
        res.json(store.products.reverse());
    });
});

router.get('/store/orders',(req,res)=>{
    Store.findById(req.store._id)
    // .populate('products.item')
    .populate({path: 'orders.products'})
    // .sort('-product.createdAt')
    .exec((err, store)=>{
        if(err) res.json(err);
        res.json(store.orders.reverse());
    });
});


module.exports = router;
const express = require('express');
const Product = require('../../schemas/product');
const _ = require('lodash');
const router = express.Router();

router.get('/products', (req, res) => {
    Product.find({}).populate('category').exec((err, products) => {
        if (err) res.json(err);
        res.json(products);
    });
});

router.post('/products/add', (req, res) => {
    const data = _.pick(req.body, ["name", "description", "manufacturer", "barcode", "commanName", "category"]);
    const product = new Product(data);
    product.save((err, product) => {
        if(err) res.json(err);
        res.json(product);
    });
});

router.get('/products/:text',(req,res)=>{
    const text = req.params.text;
    Product.findOne({barcode:text}).exec((err, product)=>{
        if(!Product){
            Product.find({'$or':[{name:new RegExp(text,'i')},{commanName:new RegExp(text,'i')}]})
            .populate('category')
            .exec((err, collection)=>{
                if (err) res.json(err)
                res.json({collection:collection});
            });
        }
        else if(product){
            res.json({product:product});
        }
    })
})

module.exports = router;
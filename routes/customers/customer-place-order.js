const express = require('express');
const router = express.Router();
const Customer = require('../../schemas/user');
const Store = require('../../schemas/store');

function requireAuth(req, res, next){
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, "kingking", function(err, decoded) {
            if (err) res.json({ success: false, message: 'Failed to authenticate token.' });
            else {
                Customer.findById(decoded._doc._id, (err, store) => {
                    req.user = store;
                    next();
                });
            }
        });
    }
    else{
        res.json("Token needed")
    }
};

const router = express.Router();

router.get('/order',(req, res)=>{
    const data = req.body
    const storeId = data.store
    const orders = {products:data.products, customer:req.user._id}
    Store.findByIdAndUpdate(storeId,{$push:{orders:orders}}).exec((err,result)=>{
        res.json(result);
    })
})

module.exports = router;
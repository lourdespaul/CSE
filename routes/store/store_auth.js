const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash')

const router = express.Router();

const Store = require('../../schemas/store');

router.get('/auth', (req, res) => {
    res.json({ mobile: "Store mobile number", password: "password of the Store" });
});

router.post('/auth', (req, res) => {
    const data = _.pick(req.body, ["mobile", "password"]);
    Store.findOne({ 'mobile.no': data.mobile })
        .select(['name', 'mobile', 'address','password'])
        .exec((err, store) => {
        if (err) throw err;
        if (!store) res.json({ success: false, message: "User not found" });
        else if (store) {
            if (store.password != data.password) res.json({ success: false, message: "Worng password" });
            else {
                const token = jwt.sign(store, "kingking");
                res.json({
                    store: store,
                    token: token,
                    message: "Auth success"
                });
            }
        }
    });
});


module.exports = router;
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Store = require('../../schemas/store');

const properties = ["name", "address", "mobile", "password"];

router.post('/register', (req, res) => {
    storeInfo = _.pick(req.body, properties);
    const store = new Store({
        name: storeInfo.name,
        address: storeInfo.address,
        'mobile.no': storeInfo.mobile,
        password: storeInfo.password
    });
    store.save((err, store) => {
        if (err) res.json(err);
        res.json(store);
    });
});

module.exports = router;
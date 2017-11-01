const express = require('express');
const Category = require('../../schemas/category');
const _ = require('lodash');
const router = express.Router();

router.get('/category', (req, res) => {
    Category.find({}, (err, categories) => {
        res.json(categories);
    });
});

router.post('/category', (req, res) => {
    const data = _.pick(req.body, ["code", "description", "name"]);
    const category = new Category(data);
    category.save((err, item) => {
        if(err) res.json(err)
        res.json(item);
    });
});

module.exports = router;
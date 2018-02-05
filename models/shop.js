"use strict"
const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
    picture: String,
    name: String,
    email: String,
    city: String,
    location: {
        type:{type: String},
        coordinates: [Number]
    }
});

const Shop = mongoose.model('Shops',ShopSchema);
module.exports = Shop;
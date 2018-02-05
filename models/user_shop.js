"use strict"
const mongoose = require('mongoose');

const UserShopSchema = mongoose.Schema({
    shop : { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Shops'
    },
    user : String,
    liked : { type: Boolean, default: true},
    timeup : { type: Date, default: Date.now }
});
const UserShop = mongoose.model('UserShop',UserShopSchema);

module.exports = UserShop;
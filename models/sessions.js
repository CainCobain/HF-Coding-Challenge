"use strict"
const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    session:{}
});

const Session = mongoose.model('Sessions',SessionSchema);
module.exports = Session;
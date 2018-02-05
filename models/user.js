"user strict"
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
      email: String,
      password: String,
      location: {
            type:{type: String, default: "Point"},
            coordinates: [Number]
        },
      created_at : { type: Date, default: Date.now }
});

userSchema.plugin(passportLocalMongoose, {
      usernameField: 'email',
      passwordField: 'password'
    });

const User = mongoose.model('User',userSchema);
module.exports = User;








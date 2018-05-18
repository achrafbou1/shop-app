
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Shop = require('../models/shop.js').schema;

var UserSchema = mongoose.Schema({
    local: { // local authentication
        username: String,
        password: String
    },
    prefShop: [Shop]
    // made local credentials for future versions of the app that would allow Google, Facebook etc sign up options
});

UserSchema.methods.generatePassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
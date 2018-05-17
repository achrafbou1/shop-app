var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// map shops collection in database 
var ShopSchema = mongoose.Schema({
    // add fields 
    picture:    String,
    name:       String,
    email:      String,
    city:       String,
    location: {
        type: String,
        coordinates: [Number]
    }
}); 

module.exports = mongoose.model('Shop', ShopSchema);


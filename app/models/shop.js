var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// map shops collection in database 
// var LocationSchema = mongoose.Schema({
//     type: String,
//     coordinates: [Number, Number]
// });

var ShopSchema = mongoose.Schema({
    // add fields 
    picture:    String,
    name:       String,
    email:      String,
    city:       String,
    location: Schema.Types.Mixed
}); 

module.exports = mongoose.model('Shop', ShopSchema);


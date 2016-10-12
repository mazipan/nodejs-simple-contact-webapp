/**
 * Created by irfan.maulana on 11/24/2015.
 */

// get an instance of mongoose and mongoose.Schema
var mongoose = require('../connection/connection');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean 
}));
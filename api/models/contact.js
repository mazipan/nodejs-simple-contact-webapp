/**
 * Created by irfan.maulana on 11/24/2015.
 */

var mongoose = require('../connection/connection');

var Schema = mongoose.Schema;
var Contact = new Schema({
    name: { type: String, required: true },
    title: { type: String},
    email: { type: String},
    email1: { type: String},
    email2: { type: String},
    email3: { type: String},
    phone: { type: String},
    phone1: { type: String},
    phone2: { type: String},
    phone3: { type: String},
    address: { type: String},
    company: { type: String},
    modified: { type: Date, default: Date.now }
});
var ContactModel = mongoose.model('Contact', Contact);

module.exports = ContactModel;
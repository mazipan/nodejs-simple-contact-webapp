/**
 * Created by irfan.maulana on 11/24/2015.
 */
var express = require('express');
var ContactModel = require('../models/contact');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var router = express.Router();

var config = require('../config'); // get our config file

router.route('/')

    // GET ALL DATA
    .get(function (req, res){
            var response = {result : false, errorDesc : ""};
            return ContactModel.find(function (err, contacts) {
                if (!err) {
                    response = {result : true, contacts : contacts};
                } else {
                    console.log(err);
                    response = {result : false, errorDesc : "Failed get data from DB."};
                }
                return res.send(response);
            });
    })

    // INSERT DATA
    .post(function (req, res){
        var response = {result : false, errorDesc : ""};
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var contact;
        var errorMessage = "";
        if(typeof req !== 'undefined'){
            if(req.body.name === null || req.body.name === ""){
                errorMessage = "Title contact is null or empty.";
                return res.send({result : false, errorDesc : errorMessage});
            }else{
                contact = new ContactModel({
                    name: req.body.name
                });

                if(req.body.title) contact.title = req.body.title;
                if(req.body.email) contact.email = req.body.email;
                if(req.body.email1) contact.email1 = req.body.email1;
                if(req.body.email2) contact.email2 = req.body.email2;
                if(req.body.email3) contact.email3 = req.body.email3;
                if(req.body.phone) contact.phone = req.body.phone;
                if(req.body.phone1) contact.phone1 = req.body.phone1;
                if(req.body.phone2) contact.phone2 = req.body.phone2;
                if(req.body.phone3) contact.phone3 = req.body.phone3;
                if(req.body.address) contact.address = req.body.address;
                if(req.body.company) contact.company = req.body.company;
                
                jwt.verify(token, config.secret, function(err, decoded) {
                    if (!err) {
                        contact.save(function (err) {
                            if (!err) {
                                console.log("contact : "+contact.title + " has been created ");
                                response = {result : true, contact : contact};
                            } else {
                                console.log(err);
                                response = {result : false, errorDesc : err};
                            }
                            return res.send(response);
                        });
                    }else{
                        console.log(err);
                        response = {result : false, errorDesc : err};
                        return res.send(response);
                    }
                });
                
            }
        }
    });

router.route('/:id')

    // GET BY ID
    .get(function (req, res){
        var response = {result : false, errorDesc : ""};
        return ContactModel.findById(req.params.id, function (err, contact) {
            if (!err) {
                console.log('get contact '+ req.params.id);
                response = {result : true, contact : contact};
            } else {
                console.log(err);
                response = {result : false, errorDesc : 'error when get contact '+ req.params.id};
            }
            return res.send(response);
        });
    })

    // UPDATE DATA
    .put(function (req, res){
        var response = {result : false, errorDesc : ""};
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        return ContactModel.findById(req.params.id, function (err, contact) {
            if(req.body.name !== null && req.body.name !== ""){
                contact.name = req.body.name;
            }

            if(req.body.title) contact.title = req.body.title;
            if(req.body.email) contact.email = req.body.email;
            if(req.body.email1) contact.email1 = req.body.email1;
            if(req.body.email2) contact.email2 = req.body.email2;
            if(req.body.email3) contact.email3 = req.body.email3;
            if(req.body.phone) contact.phone = req.body.phone;
            if(req.body.phone1) contact.phone1 = req.body.phone1;
            if(req.body.phone2) contact.phone2 = req.body.phone2;
            if(req.body.phone3) contact.phone3 = req.body.phone3;
            if(req.body.address) contact.address = req.body.address;
            if(req.body.company) contact.company = req.body.company;
                
            jwt.verify(token, config.secret, function(err, decoded) {
                if (!err) {
                    return contact.save(function (err) {
                        if (!err) {
                            console.log("contact has been updated "+ req.params.id);
                            response = {result : true, contact : contact};
                        } else {
                            console.log(err);
                            response = {result : false, errorDesc : 'error when update contact '+ req.params.id};
                        }
                        return res.send(response); 
                    });
                }else{
                    console.log(err);
                    response = {result : false, errorDesc : err};
                    return res.send(response); 
                }
            });
        });
    })

    // DELETE DATA
    .delete(function (req, res){
        var response = {result : false, errorDesc : ""};
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        return ContactModel.findById(req.params.id, function (err, contact) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (!err) {
                    return contact.remove(function (err) {
                        if (!err) {
                            console.log("contact "+ req.params.id +" removed !");
                            response = {result : true, contact : contact};
                        } else {
                            console.log(err);
                            response = {result : false, errorDesc : 'error when remove contact '+ req.params.id};
                        }
                        return res.send(response);
                    });
                }else{
                    console.log(err);
                    response = {result : false, errorDesc : err};
                    return res.send(response); 
                }
            });
        });
    });


module.exports = router;
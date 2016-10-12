/**
 * Created by irfan.maulana on 11/24/2015.
 */
var express = require('express');
var UserModel = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


var router = express.Router();

var config = require('../config'); // get our config file

router.route('/')
    .post(function (req, res){
        var errorMessage = "";
        if(typeof req !== 'undefined'){
            if(req.body.username !== null && req.body.username !== "" &&
                req.body.password !== null && req.body.password !== ""){
                    return UserModel.findOne({
                        'name': req.body.username,
                        'password': req.body.password
                    })
                    .exec(function (err, user) {
                        if (!err && user !== null) {
                            console.info('User success login ==> '+ req.body.username);
                             
                            var token = jwt.sign(user, config.secret, {
                            });

                            // return the information including token as JSON
                            return res.send({result: true, token: token});
                        } else {
                            console.error(err);
                            return res.send({result : false, errorDesc : 'Error when login '+ req.body.username});
                        }
                    });                
            }else{
                errorMessage = "Failed getting parameter username or password.";
                return res.send({result : false, errorDesc : errorMessage});
            }
        }else{
            errorMessage = "Request is null or empty.";
            return res.send({result : false, errorDesc : errorMessage});
        }
});

router.route('/addnew')
    .post(function (req, res){
        var errorMessage = "";
        if(typeof req !== 'undefined'){
            if(req.body.username !== null && req.body.username !== "" &&
                req.body.password !== null && req.body.password !== ""){

                    var user = new UserModel({ 
                        'name': req.body.username,
                        'password': req.body.password,
                        'admin': true 
                    });
                    // save the sample user
                    user.save(function(err) {
                        if (err) throw err;
                        console.log('User saved successfully');
                        res.json({ success: true });
                    });
            }else{
                errorMessage = "Failed getting parameter username or password.";
                return res.send({result : false, errorDesc : errorMessage});
            }
        }else{
            errorMessage = "Request is null or empty.";
            return res.send({result : false, errorDesc : errorMessage});
        }
});

module.exports = router;
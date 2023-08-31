var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var async= require('async');
const mongoConnection = require('../utilities/connections');
const constants = require('../utilities/constants');
const responseManager = require('../utilities/responesManager');
var userModel=require('../models/users.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('singup', { layout: false, title: 'Express' });
});
router.post('/',async(req,res)=>{
  console.log("req.body", req.body);
  if(Object.keys(req.body).length > 0){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let checkExisting = await primary.model(constants.MODELS.users,userModel).findOne({email : req.body.email}).lean();
        if(checkExisting == null){
           let newuser =  await primary.model(constants.MODELS.users, userModel).create(req.body);
           console.log("newuser", newuser);
           return responseManager.onSuccess('user Created Successfully..', newuser,res);
        }else{
          return responseManager.badrequest("Email id already exist, Please try again with new email...",res);
        }
        
    }else{
        return responseManager.badrequest("Invalid email to create user, Please try again", res);
    }
}else{
    return responseManager.badrequest("Invalid data to create user, Please try again", res);
}
}); 

module.exports = router;

var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var router = express.Router();
var mongoConnection = require('../utilities/connections');
var constants = require('../utilities/constants');
var responesManager = require('../utilities/responesManager');
var userModel=require('../models/users.model');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/', async(req, res) =>{
  if(Object.keys(req.body).length > 0){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) && req.body.password && req.body.password.trim() ≠ '')=>{
      let primary = mongoConnection.useDb(constants.DEFAULT_DB);
      let checkExisting = await primary.model(constants.MODELS.users,userModel).findOne({email : req.body.email, password : req.body.password}).lean();
      if(checkExisting ≠ null){
        req.session.userid = checkExisting._id.toString();
        var goto = process.env.APP_URI + '/logout';
        res.writeHead(302, {'Location': goto});
        res.end();
          }
    else{

    }
    }else{}
    
  }
    else{

    }
  
})

module.exports = router;

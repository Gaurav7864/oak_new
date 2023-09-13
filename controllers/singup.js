var mongoConnection = require('../utilities/connections');
var constants = require('../utilities/constants');
var responseManager = require('../utilities/responesManager');
var userModel = require('../models/users.model');
const helper = require('../utilities/helper')

exports.singupview = function (req, res, next) {
    res.render('singup', { layout: false, title: 'Express' });
}

exports.singuppost = async (req, res) => {
    console.log("req.body", req.body);
    if (Object.keys(req.body).length > 0) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let checkExisting = await primary.model(constants.MODELS.users, userModel).findOne({ email: req.body.email }).lean();
        if (checkExisting == null) {
          req.body.password = await helper.passwordEncryptor(req.body.password);
          let newuser = await primary.model(constants.MODELS.users, userModel).create(req.body);
          console.log("newuser", newuser);
          return responseManager.onSuccess('user Created Successfully..', newuser, res);
        } else {
          return responseManager.badrequest({ message :"Email id already exist, Please try again with new email..."}, res);
        }
  
      } else {
        return responseManager.badrequest({ message :"Invalid email to create user, Please try again"}, res);
      }
    } else {
      return responseManager.badrequest({ message :"Invalid data to create user, Please try again"}, res);
    }
}
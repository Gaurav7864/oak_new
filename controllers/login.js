var mongoConnection = require('../utilities/connections');
var constants = require('../utilities/constants');
var responesManager = require('../utilities/responesManager');
var userModel = require('../models/users.model');
const helper = require('../utilities/helper')
exports.viewlogin = async (req, res) => {
    res.render('login', { layout: false, title: 'Express' });
}
exports.postlogin = async (req, res) => {
    if (Object.keys(req.body).length > 0) {
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) && req.body.password && req.body.password.trim() != '') {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let checkExisting = await primary.model(constants.MODELS.users, userModel).findOne({ email: req.body.email }).lean();
        if (checkExisting != null) {
          let decpassword = await helper.passwordDecryptor(checkExisting.password);
          if (decpassword == req.body.password) {
            req.session.userId = checkExisting._id.toString();
            return responesManager.onSuccess('Login successfully...', 1, res);
          } else {
            return responesManager.badrequest({ message: 'Invalid password, please try again' }, res);
          }
        } else {
          return responesManager.badrequest({ message: 'Invalid password, please try again' }, res);
        }
      } else {
        return responesManager.badrequest({ message: 'Invalid email, please try again' }, res);
      }
    } else {
      return responesManager.badrequest({ message: 'Invalid user, please try again' }, res);
    }
}
var express = require('express');
var router = express.Router();
let mongoConnection = require('../utilities/connections');
let constants = require('../utilities/constants');
let responesManager = require('../utilities/responesManager');
let userModel = require('../models/users.model');

/* GET users listing. */
router.get('/', function (req, res) {
  if (req.session.userId) {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    }
  res.send('respond with a resource');
});

module.exports = router;

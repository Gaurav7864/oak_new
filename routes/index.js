var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var router = express.Router();
const loginCtrl = require('../controllers/login');
/* GET home page. */
router.get('/', loginCtrl.viewlogin);
router.post('/', loginCtrl.postlogin);

module.exports = router
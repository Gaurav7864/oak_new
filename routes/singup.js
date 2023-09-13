var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var singupCtrl = require('../controllers/singup');

/* GET home page. */
router.get('/', singupCtrl.singupview);
router.post('/', singupCtrl.singuppost);

module.exports = router;

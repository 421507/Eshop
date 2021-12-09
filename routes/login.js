/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 00:54:39
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const {renderLoginPage}=require('../controller/auth');

  renderLoginPage(req,res);
});

module.exports = router;
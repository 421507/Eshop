/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 02:01:19
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 02:05:27
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const user=require('../controller/user');

  user.logout(req,res);

});

module.exports = router;

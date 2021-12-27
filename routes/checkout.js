/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-27 23:04:02
 */
var express = require('express');
var router = express.Router();
const user=require('../controller/middleware/user');
/* GET home page. */
router.get('/', user.isIdentify ,function(req, res) {

  const cart=require('../controller/cartPage');
  cart.renderCheckoutPage(req,res);
});

module.exports = router;

/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:16:58
 */
var express = require('express');
var router = express.Router();
const user=require('../controller/middleware/user');
/* GET home page. */
router.get('/',user.navBarSearch, user.isIdentify ,function(req, res) {

  const cart=require('../controller/cartPage');
  cart.renderCheckoutPage(req,res);
});

module.exports = router;

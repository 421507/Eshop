/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:20:44
 */
var express = require('express');
var router = express.Router();
const user=require('../controller/middleware/user');
/* GET home page. */
router.get('/',user.navBarSearch, user.isIdentify,function(req, res) {

  const product=require("../controller/detailProductPage");
  product.renderProductDetail(req,res);
});

module.exports = router;

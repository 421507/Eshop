/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:20:53
 */
const express = require('express');
const router = express.Router();
const user=require('../controller/middleware/user');
/* GET home page. */
router.get('/',user.navBarSearch, function(req, res, next) {
  const product=require("../controller/productListingPage");
 
  product.renderProductList(req,res);
});

module.exports = router;

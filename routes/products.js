/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 00:36:37
 */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const product=require("../controller/sanpham");
 
  product.renderProductList(req,res);
});

module.exports = router;

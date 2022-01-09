/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:16:31
 */
var express = require('express');
var router = express.Router();
const {navBarSearch}=require('../controller/middleware/user');
/* GET home page. */
router.get('/', navBarSearch,function(req, res) {
  
  const sanpham=require('../controller/homePage');


  sanpham.renderHomePage(req,res);

});

module.exports = router;

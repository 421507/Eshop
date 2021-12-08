/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 01:46:40
 */
var express = require('express');
var router = express.Router();
const Op=require('sequelize');
const db = require("../models/index");
const Sanpham = db.sanpham;
const Hinhanh=db.hinhanh;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const sanpham=require('../controller/sanpham');

  sanpham.renderHomePage(req,res);

});

module.exports = router;

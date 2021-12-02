/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 16:48:26
 */
var express = require('express');
var router = express.Router();
const Op=require('sequelize');
const db = require("../models/index");
const Sanpham = db.sanpham;
const Hinhanh=db.hinhanh;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // Sanpham.findAll({
  //   attributes:['id_sanpham','ten_sanpham','gia_sanpham']
  // })
  //   .then((data) => {
  //     let products=[];

  //     data.map(item => {
        
  //       const condition={id_sanpham:item.id_sanpham};

  //       Hinhanh.findAll({
  //         where:condition,
  //         attributes:['url']
  //       })
  //       .then(lst=>{
    
  //         products.push({
  //           gia_sanpham:item.gia_sanpham,
  //           ten_sanpham:item.ten_sanpham,
  //           url:lst[0].url
  //         });
  //         console.log(products);
  //       })
  //       .catch(err=>{
  //         console.log("Error retrieve image");
  //         console.log(err);
  //       });

  //     });
  //     // console.log(products);
  //     res.render('index', { data: products });
  //   })
  //   .catch((err) => {
  //     // res.status(500).send({
  //     //   message:
  //     //     err.message || "Some error occurred while retrieving tutorials.",
  //     // });
  //     console.log(err);
  //     console.log("Error retrieve product!");
  //   });

  const sanpham=require('../controller/sanpham');

  sanpham.renderHomePage(req,res);

});

module.exports = router;

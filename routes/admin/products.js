/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 17:35:01
 */
var express = require('express');
var router = express.Router();
const {isAdmin,viewProduct}=require('../../controller/middleware/admin/user');
const product=require('../../controller/admin/productPage');

router.get('/',isAdmin,viewProduct,function(req, res) {

    product.renderListing(req,res);

});

router.get('/:id',isAdmin,function(req, res) {

    product.renderDetail(req,res);

});

module.exports = router;
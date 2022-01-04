/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 16:03:03
 */
var express = require('express');
var router = express.Router();
const {isAdmin}=require('../../controller/middleware/admin/user');
const product=require('../../controller/admin/productPage');

router.get('/',isAdmin,function(req, res) {

    product.renderListing(req,res);

});

router.get('/:id',isAdmin,function(req, res) {

    product.renderDetail(req,res);

});

module.exports = router;
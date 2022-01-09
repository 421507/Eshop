/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:25:53
 */
var express = require('express');
var router = express.Router();
const { isAdmin, addProduct } = require('../../controller/middleware/admin/user');
const product = require('../../controller/admin/productPage');

router.get('/', isAdmin, addProduct,function (req, res) {

    product.renderTypeBrandCreate(req, res);

});

module.exports = router;
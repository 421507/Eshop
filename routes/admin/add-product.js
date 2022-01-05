/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-05 15:23:00
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const product=require('../../controller/admin/productPage');

router.get('/', isAdmin, function (req, res) {

    product.renderAddPage(req,res);

});

module.exports = router;
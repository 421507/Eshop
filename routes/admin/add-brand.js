/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:24:28
 */
var express = require('express');
var router = express.Router();
const { isAdmin ,addProduct} = require('../../controller/middleware/admin/user');
const brand = require('../../controller/admin/brands');

router.get('/', isAdmin,addProduct ,function (req, res) {

    brand.renderPage(req, res);

});

module.exports = router;
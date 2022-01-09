/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:25:44
 */
var express = require('express');
var router = express.Router();
const { isAdmin, addProduct } = require('../../controller/middleware/admin/user');
const type = require('../../controller/admin/types');

router.get('/', isAdmin, addProduct,function (req, res) {

    type.renderPage(req, res);

});

module.exports = router;
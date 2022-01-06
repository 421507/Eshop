/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 16:26:12
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const brand = require('../../controller/admin/brands');

router.get('/', isAdmin, function (req, res) {

    brand.renderPage(req, res);

});

module.exports = router;
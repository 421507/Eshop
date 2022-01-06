/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 20:07:54
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const shipping = require('../../controller/admin/shippings');

router.get('/', isAdmin, function (req, res) {

    shipping.renderPage(req, res);

});

module.exports = router;
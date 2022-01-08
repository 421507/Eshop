/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 09:41:35
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const brand = require('../../controller/admin/brands');

router.get('/', isAdmin, function (req, res) {

    brand.renderDetail(req, res);

});

module.exports = router;
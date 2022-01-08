/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 14:55:06
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const customize = require('../../controller/admin/customize');

router.get('/', isAdmin, function (req, res) {

    customize.renderStatusDelivery(req, res);

});

module.exports = router;
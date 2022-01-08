/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 16:12:47
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const customize = require('../../controller/admin/customize');

router.get('/', isAdmin, function (req, res) {

    customize.renderMethodPaymentCreate(req, res);

});

module.exports = router;
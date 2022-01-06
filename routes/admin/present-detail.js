/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 23:44:40
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const present = require('../../controller/admin/presents');

router.get('/', isAdmin, function (req, res) {

    present.renderDetail(req, res);

});

module.exports = router;
/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 12:54:18
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const present = require('../../controller/admin/presents');

router.get('/', isAdmin, function (req, res) {

    present.renderAdd(req, res);

});

module.exports = router;
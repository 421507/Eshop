/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 17:12:11
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const type = require('../../controller/admin/types');

router.get('/', isAdmin, function (req, res) {

    type.renderPage(req, res);

});

module.exports = router;
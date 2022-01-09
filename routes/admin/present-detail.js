/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:29:08
 */
var express = require('express');
var router = express.Router();
const { isAdmin, updatePresent } = require('../../controller/middleware/admin/user');
const present = require('../../controller/admin/presents');

router.get('/', isAdmin,updatePresent, function (req, res) {

    present.renderDetail(req, res);

});

module.exports = router;
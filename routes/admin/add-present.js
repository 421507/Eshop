/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:25:27
 */
var express = require('express');
var router = express.Router();
const { isAdmin, addPresent } = require('../../controller/middleware/admin/user');
const present = require('../../controller/admin/presents');

router.get('/', isAdmin, addPresent,function (req, res) {

    present.renderAdd(req, res);

});

module.exports = router;
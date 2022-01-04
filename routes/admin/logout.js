/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 02:56:30
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 02:06:07
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const user = require('../../controller/admin/user');

    user.logout(req, res);
});

module.exports = router;

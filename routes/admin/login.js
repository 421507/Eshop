/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 00:26:37
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 00:47:15
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin'
    });
});

module.exports = router;

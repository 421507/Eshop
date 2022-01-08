/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 08:20:59
 */
var express = require('express');
var router = express.Router();
const { isAdmin } = require('../../controller/middleware/admin/user');
const noti = require('../../controller/admin/notification');

router.get('/', isAdmin, function (req, res) {

    noti.renderReply(req, res);

});

module.exports = router;
/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 15:10:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:25:12
 */
var express = require('express');
var router = express.Router();
const { isAdmin, addGroup } = require('../../controller/middleware/admin/user');
const user = require('../../controller/admin/user');

router.get('/', isAdmin, addGroup,function (req, res) {

    user.renderGroupAdd(req, res);

});

module.exports = router;
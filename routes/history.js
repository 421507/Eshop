/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-03 00:46:23
 */
var express = require('express');
var router = express.Router();
const user = require('../controller/middleware/user');
const cart = require('../controller/cartPage');
router.get('/', user.isAuth, (req, res) => {

    cart.renderHistoryPage(req, res);
});

module.exports = router;

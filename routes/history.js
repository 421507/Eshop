/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:18:34
 */
var express = require('express');
var router = express.Router();
const user = require('../controller/middleware/user');
const cart = require('../controller/cartPage');
router.get('/',user.navBarSearch, user.isAuth, (req, res) => {

    cart.renderHistoryPage(req, res);
});

module.exports = router;

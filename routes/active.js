/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 14:04:21
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:22:14
 */
const express = require('express');
const router = express.Router();
const {navBarSearch}=require('../controller/middleware/user');
router.get('/', navBarSearch,async (req, res) => {

    const user = require('../controller/user');

    user.activeUser(req, res);
});

module.exports = router;
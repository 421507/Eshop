/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 14:04:21
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 22:14:25
 */
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    const user = require('../controller/user');

    user.activeUser(req, res);
});

module.exports = router;
/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 14:04:21
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:20:15
 */
const express = require('express');
const router = express.Router();
const user=require('../controller/middleware/user');
router.get('/',user.navBarSearch, async (req, res) => {

    const present = require('../controller/present');

    present.renderPage(req, res);
});

module.exports = router;
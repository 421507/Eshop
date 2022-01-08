/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 14:04:21
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 17:48:36
 */
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    const present = require('../controller/present');

    present.renderPage(req, res);
});

module.exports = router;
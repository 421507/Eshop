/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:29:22
 */
var express = require('express');
var router = express.Router();
const { isAdmin, viewPresent } = require('../../controller/middleware/admin/user');
const present = require('../../controller/admin/presents');

router.get('/', isAdmin,viewPresent, function (req, res) {

    present.renderListing(req, res);

});

// router.get('/:id', isAdmin, function (req, res) {

//     product.renderDetail(req, res);

// });

module.exports = router;
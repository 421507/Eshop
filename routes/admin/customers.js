/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:26:37
 */
var express = require('express');
var router = express.Router();
const { isAdmin, viewCustomer } = require('../../controller/middleware/admin/user');
const customer = require('../../controller/admin/customers');

router.get('/', isAdmin, viewCustomer,function (req, res) {

    customer.renderListing(req, res);

});

// router.get('/:id', isAdmin, function (req, res) {

//     product.renderDetail(req, res);

// });

module.exports = router;
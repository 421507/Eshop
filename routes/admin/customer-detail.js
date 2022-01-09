/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 12:23:07
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 18:26:27
 */
var express = require('express');
var router = express.Router();
const { isAdmin, updateCustomer } = require('../../controller/middleware/admin/user');
const customer = require('../../controller/admin/customers');

router.get('/', isAdmin, updateCustomer,function (req, res) {

    customer.renderDetail(req, res);

});

module.exports = router;
/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 00:17:59
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 01:55:25
 */
var express = require('express');
var router = express.Router();
const {isAdmin}=require('../../controller/middleware/admin/user');

router.get('/',isAdmin,function(req, res) {
    const home=require('../../controller/admin/homePage');

    home.renderHomePage(req,res);

});

module.exports = router;
/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-02 15:54:27
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:21:39
 */
var express = require('express');
var router = express.Router();
const user=require('../controller/middleware/user');
/* GET Login page. */
router.get('/', user.navBarSearch,function(req, res, next) {
    const result=require('../controller/resultPage');
    result.renderPage(req,res);
});

module.exports = router;
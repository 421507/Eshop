/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-02 15:54:27
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 17:39:43
 */
var express = require('express');
var router = express.Router();
/* GET Login page. */
router.get('/', function(req, res, next) {
    const result=require('../controller/resultPage');
    result.renderPage(req,res);
});

module.exports = router;
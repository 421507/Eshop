/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:18:56
 */
var express = require('express');
var router = express.Router();
const auth=require('../controller/auth');
const {isAuth,navBarSearch} = require('../controller/middleware/user');
/* GET Login page. */
router.get('/',navBarSearch, function(req, res, next) {

  auth.renderLoginPage(req,res);
});

router.post('/',auth.login);

module.exports = router;
/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:18:03
 */
var express = require('express');
var router = express.Router();
const contact=require('../controller/contact');
const user=require('../controller/middleware/user');
/* GET home page. */
router.get('/',user.navBarSearch, function(req, res, next) {
  contact.render(req,res);
});

module.exports = router;

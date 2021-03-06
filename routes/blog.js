/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-03 21:26:32
 */
var express = require('express');
var router = express.Router();
const blog=require('../controller/blogPage');

router.get('/', function(req, res, next) {
  blog.renderBlogPage(req,res);
});

module.exports = router;

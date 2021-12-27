/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-27 23:03:02
 */
var express = require('express');
var router = express.Router();
const user=require('../controller/middleware/user');
const cart=require('../controller/cartPage');
router.get('/', user.isIdentify , (req, res) => {
  
  cart.renderCartPage(req,res);
});
router.post('/',(req,res,next)=>{
  cart.handleDetailCart(req,res);
})
module.exports = router;

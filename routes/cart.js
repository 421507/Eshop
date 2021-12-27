/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 13:05:32
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-21 12:02:40
 */
var express = require('express');
var router = express.Router();
const user=require('../controller/middleware/user');

router.get('/', user.isIdentify , (req, res) => {
  const cart=require('../controller/giohang');
  cart.renderCartPage(req,res);
});
router.post('/',(req,res,next)=>{

  const detailCart=require('../controller/giohangchitiet');

  detailCart.handleDetailCart(req,res);
})
module.exports = router;

/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:27:19
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-01 17:30:34
 */
module.exports = product => {
    const sanpham = require("../../controller/sanpham");
  
    const router = require("express").Router();
  
    // Retrieve all Tutorials
    // router.get("/", sanpham.findAll);
  
    product.use('/api/product', router);
};
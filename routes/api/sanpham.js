/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:27:19
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 12:53:34
 */
module.exports = product => {
    const sanpham = require("../../controller/homePage");

    const router = require("express").Router();

    // Retrieve all Tutorials
    // router.get("/", sanpham.findAll);

    product.use('/api/product', router);
};
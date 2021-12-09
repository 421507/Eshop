/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-25 22:32:06
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-11-25 23:59:20
 */
module.exports = cart => {
    const giohang=require("../../controller/giohang");
    const router=require("express").Router();

    router.post("/:id",giohang.create);

    cart.use('/api/cart',router)
};
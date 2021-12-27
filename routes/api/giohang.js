/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-25 22:32:06
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-21 19:47:31
 */
module.exports = cart => {
    const user=require('../../controller/middleware/user');
    const giohang=require("../../controller/giohang");
    const router=require("express").Router();

    router.post("/:id",user.isIdentify,giohang.create);

    router.delete("/:id",user.isIdentify,giohang.remove);

    router.put("/:id",user.isIdentify,giohang.update);

    router.post("/checkout/:id",user.isIdentify,giohang.checkout);

    cart.use('/api/cart',router)
};
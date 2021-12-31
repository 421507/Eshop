/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-25 22:32:06
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-31 00:19:38
 */
module.exports = cart => {
    const user=require('../../controller/middleware/user');
    const giohang=require("../../controller/cartPage");
    const router=require("express").Router();

    router.post("/checkout",user.isIdentify,giohang.checkout);

    router.post("/:id",user.isIdentify,giohang.create);

    router.delete("/:id",user.isIdentify,giohang.remove);

    router.put("/",user.isIdentify,giohang.update);

    cart.use('/api/cart',router)
};
/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:04:43
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 01:35:04
 */

module.exports = app => {
    const user = require("../../../controller/admin/user");

    // const { isAdmin } = require('../../controller/middleware/user');

    const router = require("express").Router();

    // router.post("/register", isAdmin, user.register);
    router.post("/login", user.login);
    // router.get("/",isAuth, async (req,res)=>{
    //     res.send(req.user);
    // });

    app.use('/api/admin', router);
};
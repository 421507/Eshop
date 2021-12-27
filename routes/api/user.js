/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:04:43
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-16 15:11:37
 */

module.exports = app => {
    const user = require("../../controller/user");
    
    const {isAuth}=require('../../controller/middleware/user');

    const router = require("express").Router();
  
    router.post("/register", user.register);
    router.post("/login", user.login);
    router.get("/",isAuth, async (req,res)=>{
        res.send(req.user);
    });
    router.post("/",isAuth,user.update);
  
    app.use('/api/user', router);
};
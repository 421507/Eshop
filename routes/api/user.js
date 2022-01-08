/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:04:43
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 20:41:09
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
    router.post("/forgetpass",user.handleForgetPass);
    router.post("/changepass",isAuth,user.handleChangePass);
  
    app.use('/api/user', router);
};
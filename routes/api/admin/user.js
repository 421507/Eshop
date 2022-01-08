/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:04:43
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 00:20:00
 */

module.exports = app => {
    const user = require("../../../controller/admin/user");
    const uploader = require('../../../controller/middleware/upload');
    const { isAdmin } = require('../../../controller/middleware/admin/user');

    const router = require("express").Router();

    router.post("/register", isAdmin, user.register);
    router.post("/forgetpass", user.forgetPass);
    router.post("/changepass", isAdmin,user.changePass);
    router.post("/login", user.login);
    router.post("/group", user.createGroup);
    router.post("/upload/:id", uploader.upload.single('avatar'), user.upload);

    router.put("/user/:id", user.update);
    router.put("/permission/:id", user.updatePermission);
    router.put("/group/:id", user.updateGroup);

    router.delete("/user/:id", isAdmin, user.remove);
    router.delete("/group/:id", isAdmin, user.groupRemove);

    app.use('/api/admin', router);
};
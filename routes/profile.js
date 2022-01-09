/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 14:04:21
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:21:16
 */
const express = require('express');
const router = express.Router();
const {isAuth,navBarSearch}=require('../controller/middleware/user');

router.get('/',navBarSearch,isAuth, async (req, res) => {

    const user=require('../controller/user');
    
    user.renderProfilePage(req,res);
});

module.exports = router;
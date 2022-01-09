/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 00:59:44
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 03:16:49
 */
const { verifyToken } = require('../../service/token');
const { getUser } = require('../../service/user');

exports.isAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.cookies.auth;
    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return res
            .status(401)
            .send('Bạn không có quyền truy cập vào tính năng này!');
    }

    try {
        const user = await getUser(verified.payload.username);
        req.user = user;

        return next();
    } catch (error) {
        console.log(err);
    }
};


exports.isAdmin = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.cookies.auth;
    if (!accessTokenFromHeader) {
        // return res.status(401).send('Không tìm thấy access token!');
        return res.redirect('/admin/login');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        // return res
        //     .status(401)
        //     .send('Bạn không có quyền truy cập vào tính năng này!');
        return res.redirect('/admin/login');
    }

    try {
        const user = await getUser(verified.payload.username);
        
        if(!user.role === "admin")
            return res.redirect('/admin/login');
        req.user=user;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("Database connection error");
    }
};

exports.viewProduct=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('viewproduct',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.addProduct=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('addproduct',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}
exports.updateProduct=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('updateproduct',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}
exports.deleteProduct=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('deleteproduct',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.viewAccount=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('viewaccount',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.addAccount=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('addaccount',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.updateAccount=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('updateaccount',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.deleteAccount=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('deleteaccount',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.viewGroup=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('viewgroup',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.addGroup=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('addgroup',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.updateGroup=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('updategroup',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.deleteGroup=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('deletegroup',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.viewCustomer=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('viewcustomer',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.updateCustomer=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('updatecustomer',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.deleteCustomer=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('deletecustomer',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.viewPresent=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('viewpresent',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.addPresent=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('addpresent',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.updatePresent=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('updatepresent',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}

exports.deletePresent=async (req,res,next) => {

    const {
        hasPermission
    }=require('../../service/group_user');

    const user=req.user;

    const check=await hasPermission('deletepresent',user.id_user);

    if(check)
        next();
    else{
        return res.status(401).send("Bạn không được quyền sử dụng tính năng này");
    }
}


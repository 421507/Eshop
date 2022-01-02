/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:19:54
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-01 23:09:10
 */
const { verifyToken } = require('../service/token');
const { getUser } = require('../service/user');
const { v4: uuidv4 } = require('uuid');
const { create: customerCreate,getAll: customerGetAll } = require('../service/khachhang');
const {create:cartCreate,getAll: cartGetAll } = require('../service/giohang');

exports.isAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.cookies.auth;
    if (!accessTokenFromHeader) {
        // return res.status(401).send('Không tìm thấy access token!');
        return res.redirect('/login');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return res.redirect('/login');
            // .status(401)
            // .send('Bạn không có quyền truy cập vào tính năng này!');
    }

    try {
        const user = await getUser(verified.payload.username);
        req.user = user;

        return next();      
    } catch (error) {
        console.log(err);
    }
};

exports.isIdentify=async (req,res,next) => {

    let uuid=req.cookies.uuid;
    let customer,cart,payload;
    if(!uuid){

        uuid= uuidv4();

        const option={
            maxAge:1000*60*60*24*365,
            httpOnly:true
        }

        res.cookie('uuid',uuid,option);

        customer = await customerCreate({ uuid: uuid });

        if (customer === null) {
            return res.status(401).send('Something wrong please try again');
        }else{
            customer.id_khachhang=customer.null;

        }

        cart = await cartCreate({ id_khachhang: customer.id_khachhang });
        if (cart === null)
            return res.status(401).send('Something wrong please try again');
        else {
            cart.id_giohang = cart.null;
        }
    }
    else{

        customer = await customerGetAll({ uuid: uuid });
  
        if (customer === null)
            return res.status(401).send("Something wrong please try again");
        else
            customer = customer[0];

        payload = {
            id_khachhang: customer.id_khachhang,
            check_out: false,
        };

        try {
            cart = await cartGetAll(payload);
            
        } catch (error) {
            console.log(error);
        }


        if (cart !== null){
            if (cart.length === 0){
                cart = await cartCreate({ id_khachhang: customer.id_khachhang });
                if (cart === null)
                    return res.status(401).send('Something wrong please try again');
                else {
                    cart.id_giohang = cart.null;
                }
            }
            else{
                cart = cart[0];
            }
        }
            
        else {
            res.status(401).send('Something wrong while retrieving giohang')
        }
    }

    req.customer=customer;
    req.cart=cart;
    req.uuid=uuid;
    return next();
}
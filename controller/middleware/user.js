/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:19:54
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:44:17
 */
const { verifyToken } = require('../service/token');
const { getUser } = require('../service/user');
const {getUser:authGetUser}=require('../service/auth');
const { v4: uuidv4 } = require('uuid');
const { create: customerCreate,getAll: customerGetAll } = require('../service/khachhang');
const {create:cartCreate,getAll: cartGetAll } = require('../service/giohang');
const {isAuth:serviceIsAuth}=require('../service/auth');

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
        console.log("AAAAAAAAAAAAAAAAAA ",user);
        const customers=await customerGetAll({id_user:user.id_user});

        if(customers === null){
            return res.redirect('/');
        }
        else if(customers.length === 0){

            return res.redirect('/');
        }
        else{
            req.customer=customers[0];
        }
        console.log("AAAAAAAAAAAAAAAAAAAAAa");
        return next();      
    } catch (error) {
        console.log(err);
    }
};

exports.isIdentify=async (req,res,next) => {

    let uuid=req.cookies.uuid;
    let customer,cart,payload;
    if(!uuid || uuid === ''){

        const auth=await serviceIsAuth(req);

        if(auth){
            const user=await authGetUser(req);
            customer = await customerGetAll({ id_user:user.id_user });
            customer=customer[0];

            const option={
                maxAge:1000*60*60*24*365,
                httpOnly:true
            }
    
            res.cookie('uuid',customer.uuid,option);

            uuid=customer.uuid;


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
        else{
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
        
    }
    else{

        customer = await customerGetAll({ uuid: uuid });

        if (customer === null || customer.length === 0)
            return res.status(401).send("Something wrong please try again");
        else
            customer = customer[0];

        if(customer.id_user !== undefined && customer.id_user !== null){
            
            const auth=await serviceIsAuth(req);

            if(!auth){
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
        }
        else{
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
    }

    req.customer=customer;
    req.cart=cart;
    req.uuid=uuid;
    return next();
}

exports.navBarSearch=async (req,res,next)=>{

    const{
        getAll:typeGetAll
    }=require('../service/loaisanpham');
    const{
        getAll:brandGetAll
    }=require('../service/thuonghieu');

    const brands=await brandGetAll({});

    if(brands === null){
        return res.status(401).send("Middleware: Can not get brand");
    }
    
    const types = await typeGetAll({});

    if(types === null){
        return res.status(401).send("Middleware: Can not get types");
    }


    req.brands=brands;
    req.types=types;
    next();
}
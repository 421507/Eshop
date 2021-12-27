/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:15:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-27 23:05:40
 */
const {update:cartUpdate,getAll: cartGetAll}=require('./service/giohang');
const { getByPk: productGetByPk,_getAll: productGetAll,update:productUpdate } = require('./service/sanpham');
const {create:addressCreate}=require('./service/diachi');
const {getAll: customerGetAll,update:customerUpdate}=require('./service/khachhang');
const {isAuth} = require('./service/auth');
const {
    create: detailCartCreate,
    getAll: detailCartGetAll,
    update: detailCartUpdate,
    remove:detailCartRemove,
} = require('./service/giohangchitiet');


exports.create = async (req, res) => {

    let gia_sp, result, condition;
    const cart=req.cart;
    
    // if (!req.cookies.uuid) {

    //     uid = uuidv4();
    //     res.cookie('uuid', uid);
    //     result = await customerCreate({ uuid: uid });
    //     if (result === null) {
    //         return res.status(401).send('Something wrong please try again');
    //     }
    //     else {
    //         id_khachhang = result.null;
    //     }
    //     result = await cartCreate({ id_khachhang: id_khachhang });
    //     if (result === null)
    //         return res.status(401).send('Something wrong please try again');
    //     else {
    //         result.id_giohang = result.null;
    //         cart = result;
    //     }
    // }
    // else {

    //     uid = req.cookies.uuid;
    //     id_khachhang = await customerGetAll({ uuid: req.cookies.uuid });
  
    //     if (id_khachhang === null)
    //         return res.status(401).send("Something wrong please try again");
    //     else
    //         id_khachhang = id_khachhang[0].id_khachhang;

    //     condition = {
    //         id_khachhang: id_khachhang,
    //         check_out: false,
    //     };

    //     cart = await cartGetAll(condition);

    //     if (cart !== null)
    //         cart = cart[0];
    //     else {
    //         res.status(401).send('Something wrong while retrieving giohang')
    //     }
    // }

    if (!req.params.id) {
        return res.status(401).send("Id product can not be found!");
    }

    result = await productGetByPk(parseInt(req.params.id));
    if (result === null)
        return res.status(401).send('Something wrong please try again');
    else{
        if(result.data.soluong_tonkho < req.body.amount)
            return res.status(401).send('Hết hàng');
        gia_sp = result.data.gia_sanpham;
    }

    if (!req.body.amount) {
        return res.status(401).send("Amount products can not be found!");
    }

    condition = {
        id_giohang: cart.id_giohang,
        id_sanpham: req.params.id,
    };

    result = await detailCartGetAll(condition);

    if (result === null)
        return res.status(401).send("Something wrong please try again");
    else {

        if (result.length > 0) {
            let field = {
                soluong: result[0].soluong + parseInt(req.body.amount),
                id_giohangchitiet: result[0].id_giohangchitiet,
                // gia:result[0].gia+parseInt(req.body.amount)*gia_sp
                gia:gia_sp
            }

            result = await detailCartUpdate(field);
            if (result === null)
                return res.status(401).send('Something wrong please try again');
            else {
                res.status(200).send('Update cart successully!');
                // const field = {
                //     // tong_tien: cart.tong_tien ? (cart.tong_tien + parseInt(req.body.amount) * gia_sp) : (parseInt(req.body.amount) * gia_sp),
                //     so_luong: cart.so_luong ? (cart.so_luong + parseInt(req.body.amount)) : parseInt(req.body.amount),
                //     id_giohang: cart.id_giohang
                // }

                // result = await cartUpdate(field);

                // if (result === null) {
                //     return res.status(401).send('Something wrong please try again');
                // }
                // else {
                //     res.status(200).send('Update cart successully!');
                // }
            }
        }
        else {

            const record = {
                id_giohang: cart.id_giohang,
                id_sanpham: req.params.id,
                // gia: parseInt(req.body.amount) * gia_sp,
                gia: gia_sp,
                soluong: parseInt(req.body.amount)
            };

            result = await detailCartCreate(record);

            if (result === null)
                return res.status(401).send("Something wrong please try again");
            else {
                res.status(200).send('Update cart successully!');
                // const field = {
                //     // tong_tien: cart.tong_tien ? Math.round((cart.tong_tien + parseInt(req.body.amount) * gia_sp)) : Math.round((parseInt(req.body.amount) * gia_sp)),
                //     so_luong: cart.so_luong ? (cart.so_luong + parseInt(req.body.amount)) : parseInt(req.body.amount),
                //     id_giohang: cart.id_giohang
                // }
                // console.log("FIELD",field);
                // result = await cartUpdate(field);

                // if (result === null) {
                //     return res.status(401).send('Something wrong please try again');
                // }
                // else {
                //     res.status(200).send('Update cart successully!');
                // }
            }
        }
    }
};

exports.remove=async (req,res)=>{
    
    const id=req.params.id;

    const result=await detailCartRemove({id_giohangchitiet:id});

    if(result === null){
        
    }

    res.status(200).send("OK");
}

exports.update=async (req,res)=>{

    const id=req.params.id;

    const amount=req.body.amount;

    const result=await detailCartUpdate({soluong:parseInt(amount),id_giohangchitiet:id});

    if(result === null){

        return res.status(401).send("Oops something wrong");
    }

    return res.status(200).send("OK");

    // let id_khachhang = await customerGetAll({ uuid: uuid });
    
    // if (id_khachhang === null)
    //     return res.status(401).send("Something wrong please try again");
    // else
    //     id_khachhang = id_khachhang[0].id_khachhang;

    // let payload = {
    //     id_khachhang: id_khachhang,
    //     check_out: false,
    // };

    
    // let cart=await cartGetAll(payload);

    // if (cart !== null)
    //     cart = cart[0];
    // else {
    //     res.status(401).send('Something wrong while retrieving giohang')
    // }

    // payload={
    //     id_giohang:cart.id_giohang,
    //     tong_tien:cart.tong_tien+parseInt(price)*(amount-prevAmount)
    // }

    // const _result=await cartUpdate(payload);

    // if(_result === null){
    //     return res.status(401).send("Oops something wrong");
    // }

    // return res.status(200).send("OK");
    
}

exports.renderCartPage=async (req,res)=>{

    if(!req.uuid){

        return res.status(401).send("Something wrong,please try again");
    }

    // const cart=await cartGetAll({id_khachhang:idCustomer,check_out:false});
    const cart=req.cart;

    if(cart === null){

        return res.status(401).send("Something wrong,please try again");
    }

    const detailCart=await detailCartGetAll({id_giohang:cart.id_giohang});

    if(detailCart === null){
        return res.status(401).send("Something wrong,please try again");
    }
    else if(detailCart.length === 0){
        
        try {
            const result=await isAuth(req);
            return res.render('cart',{auth:result});
        } catch (error) {
            console.log(error);
            return;
        }
        
    }

    const idProduct=detailCart.map(item=>item.id_sanpham);

    const products=await productGetAll({id_sanpham:idProduct});


    const payload=detailCart.map(item=>{

        function findProduct(id,products){

            for(let i=0;i<products.length;++i){
                if(products[i].id_sanpham === id)
                    return products[i];
            }

        }

        const product=findProduct(item.id_sanpham,products);
   
        return {
            id_sanpham:product.id_sanpham,
            thumbnail:product.thumbnail,
            ten_sanpham:product.ten_sanpham,
            gia:item.gia,
            so_luong:item.soluong,
            tong_cong:Math.round(item.soluong*item.gia),
            id_detailcart:item.id_giohangchitiet,
            link_sanpham:`/product-details?id=${product.id_sanpham}`,
        }
    });

    isAuth(req)
    .then(result=>{
        return res.render('cart',{data:payload,auth:result});

    })
    .catch(err=>{
        console.log(err);
    });

}

exports.renderCheckoutPage=async (req,res)=>{

    if(!req.uuid){

        return res.status(401).send("Something wrong,please try again");
    }

    const cart=req.cart;

    if(cart === null){

        return res.status(401).send("Something wrong,please try again");
    }

    const detailCart=await detailCartGetAll({id_giohang:cart.id_giohang});

    if(detailCart === null){
        return res.status(401).send("Something wrong,please try again");
    }
    else if(detailCart.length === 0){

        try {
            const result=await isAuth(req)
            return res.render('checkout',{checkout:false,auth:result});
    
        } catch (error) {
            console.log(error);
            return;
        }
    }

    const idProduct=detailCart.map(item=>item.id_sanpham);

    const products=await productGetAll({id_sanpham:idProduct});

    let subTotal=0;
    const payload=detailCart.map(item=>{

        function findProduct(id,products){

            for(let i=0;i<products.length;++i){
                if(products[i].id_sanpham === id)
                    return products[i];
            }

        }

        const product=findProduct(item.id_sanpham,products);

        subTotal+=Math.round(item.gia*item.soluong);
        
        return {
            id_sanpham:product.id_sanpham,
            thumbnail:product.thumbnail,
            ten_sanpham:product.ten_sanpham,
            gia:item.gia,
            so_luong:item.soluong,
            tong_cong:Math.round(item.soluong*item.gia),
            id_detailcart:item.id_giohangchitiet,
            link_sanpham:`/product-details?id=${product.id_sanpham}`,
        }
    });

    const exoTax=2;
    const shippingCost=0;
    const total=subTotal*(1-exoTax/100);
    console.log(cart.id_giohang);
    
    isAuth(req)
    .then(result=>{
        return res.render('checkout',{
            data:payload,
            subTotal:subTotal,
            shippingCost:shippingCost,
            total:total,
            exoTax:exoTax,
            id_cart:cart.id_giohang,
            checkout:true,
            auth:result
        });
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.checkout=async (req,res)=>{

    console.log(req.body);

    const {email,name,phone,sonha,street,ward,district,city,province}=req.body;

    let payload={
        so_nha:sonha,
        street:street,
        ward:ward,
        district:district,
        city:city,
        province:province
    }
    const address=await addressCreate(payload);

    if(address === null){

        return res.status(401).send("Something wrong please try again");
    }

    address.id_diachi=address.null;

    const cart=req.cart;

    const detailCart=await detailCartGetAll({id_giohang:cart.id_giohang});
    
    const idProduct=detailCart.map(item=>item.id_sanpham);

    const products=await productGetAll({id_sanpham:idProduct});
    
    let total=0;
    detailCart.forEach(async item=>{

        total+=Math.round(item.gia*item.soluong);
        
        function findProduct(id,products){

            for(let i=0;i<products.length;++i){
                if(products[i].id_sanpham === id)
                    return products[i];
            }

        }

        const product=findProduct(item.id_sanpham,products);

        payload={
            soluong_tonkho:product.soluong_tonkho-item.soluong,
            soluong_daban:product.soluong_daban+item.soluong,
            id_sanpham:product.id_sanpham
        }

        const result=await productUpdate(payload);
        
    });

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    payload={
        id_diachi:address.id_diachi,
        id_giohang:req.params.id,
        tong_tien:total,
        ngay_dat:dateTime,
        check_out:true
    }
    let result=await cartUpdate(payload);

    if(result === null){

        return res.status(401).send("Something wrong please try again");
    }

    payload={
        email:email,
        phone:phone,
        name:name,
        id_khachhang:req.customer.id_khachhang
    }

    result=await customerUpdate(payload);

    if(result===null){
        return res.status(401).send("Something wrong please try again");
    }   

    return res.status(200).send('ok');
}

exports.handleDetailCart=async (req,res)=>{

    const uuid=req.cookies.auth;
    if(!uuid){
        return res.redirect('/cart');
    }

    if(req.query.method === 'delete'){

        const id=req.query.id;

        const result=await detailCartRemove({id_giohangchitiet:id});

        if(result === null){
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
        }
        res.redirect('/cart');

    }
    else if(req.query.method === 'post'){

        const id=req.query.id;

        const amount=req.body.amount;

        const prevAmount=req.body.prevAmount;

        const price=req.body.price;

        const result=await detailCartUpdate({soluong:parseInt(amount),id_giohangchitiet:id});

        if(result === null){

            return res.status(401).send("Oops something wrong");
        }

        let id_khachhang = await customerGetAll({ uuid: uuid });

        if (id_khachhang === null)
            return res.status(401).send("Something wrong please try again");
        else
            id_khachhang = id_khachhang[0].id_khachhang;

        let payload = {
            id_khachhang: id_khachhang,
            check_out: false,
        };


        let cart=await cartGetAll(payload);

        if (cart !== null)
            cart = cart[0];
        else {
            res.status(401).send('Something wrong while retrieving giohang')
        }

        payload={
            id_giohang:cart.id_giohang,
            tong_tien:cart.tong_tien+parseInt(price)*(amount-prevAmount)
        }

        const _result=await cartUpdate(payload);

        if(_result === null){
            return res.status(401).send("Oops something wrong");
        }

        return res.status(200).send("OK");
    }
}
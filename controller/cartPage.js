/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 22:15:05
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 18:45:24
 */
const {
    update:cartUpdate,
    getAll: cartGetAll
}=require('./service/giohang');
const { 
    getByPk: productGetByPk,
    _getAll: productGetAll,
    update:productUpdate
} = require('./service/sanpham');
const {
    create:addressCreate
}=require('./service/diachi');
const {
    getAll: customerGetAll,
    update:customerUpdate
}=require('./service/khachhang');
const {
    isAuth
} = require('./service/auth');
const {
    create: detailCartCreate,
    getAll: detailCartGetAll,
    update: detailCartUpdate,
    remove:detailCartRemove,
    multicreate:detailCartMuliCreate
} = require('./service/giohangchitiet');
const {
    create:shippingCreate
}=require('./service/shipping');
const {
    getAll:cityGetAll,
}=require('./service/thanhpho');
const {
    getAll:statusShippingGetAll,
}=require('./service/trangthaigiaohang');
const{
    getAll:customerPresentGetAll,
    update:customerPresentUpdate
}=require('./service/khachhang_present');
const{
    getAll:presentGetAll,
}=require('./service/present');
const{
    getAll:voucherGetAll,
}=require('./service/voucher');

exports.create = async (req, res) => {
    let gia_sp, result, condition;
    const cart=req.cart;
    

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

        console.log(result);
        let detailCarts=[];
        
        result.forEach(item=>{

            if(item.gia > 0){
                detailCarts.push(item);
            }

        });

        console.log(detailCarts);

        if (detailCarts.length > 0) {

            let field = {
                soluong: detailCarts[0].soluong + parseInt(req.body.amount),
                id_giohangchitiet: detailCarts[0].id_giohangchitiet,
                gia:gia_sp
            }

            result = await detailCartUpdate(field);
            if (result === null)
                return res.status(401).send('Something wrong please try again');
            else {
                res.status(200).send('Update cart successully!');
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
    
    console.log(req.body);
    
    const deleteDetailCarts=req.body.deleteDetailCarts !== '' ? req.body.deleteDetailCarts : [];
    const updateDetailCarts=req.body.updateDetailCarts !== '' ? req.body.updateDetailCarts : [];
    const hasDiscount=req.body.discount === "true" ? true:false;
    const hasVoucher=req.body.voucher === "true"? true:false;
    const discountIdCustomerPresent=req.body.idDiscount === '-1' ? -1 : parseInt(req.body.idDiscount);
    const voucherIdCustomerPresent=req.body.idVoucher === '-1' ? -1 : parseInt(req.body.idVoucher);
    
    const payload={};
    payload.empty=false;

    let result;
    if(deleteDetailCarts && deleteDetailCarts.length > 0)
        result=await detailCartRemove({id_giohangchitiet:deleteDetailCarts})
    
    if((!updateDetailCarts || updateDetailCarts.length === 0) && voucherIdCustomerPresent === -1){
        payload.empty=true;

        // return res.status(200).send(payload);
    }

    for (let i=0;i<updateDetailCarts.length;++i){

        const id=updateDetailCarts[i].id_detailcart;

        const amount=updateDetailCarts[i].quanity;

        await detailCartUpdate({soluong:parseInt(amount),id_giohangchitiet:id})
    }
    
    if(hasVoucher){
        payload.voucherErrorCode=0;

        let props={
            id:voucherIdCustomerPresent,
            slug_trangthai:['pending','not_used']
        }

        const statusPresents=await customerPresentGetAll(props);
    
        if(statusPresents === null)
            return res.status(401).send("Something wrong please try again");

        if(statusPresents.length > 0){
            
            for(let i=0;i<statusPresents.length;++i){
                
                if(statusPresents[i].slug_trangthai === "pending"){

                    const idPresent=statusPresents[0].id_present;

                    result=await presentGetAll({id:idPresent});

                    if(result === null)
                        return res.status(401).send("Something wrong please try again");
                    
                    const present=result[0];

                    const startDate=new Date(present.ngay_batdau);
                    const endDate=new Date(present.ngay_ketthuc);
                    const today=new Date();
                    today.setHours(today.getHours()+7);

                    if(today < startDate){
                        payload.voucherErrorCode=1;
                        payload.voucherMessage='Voucher hiện tại chưa thể sử dụng';
                    }
                    else if(today <= endDate){
                        payload.voucherErrorCode=0;
                    }
                    else{
                        payload.voucherErrorCode=1;
                        payload.voucherMessage='Voucher hiện tại không thể sử dụng';

                        result=await customerPresentUpdate({
                            id:statusPresents[0].id,
                            trang_thai:'Không thể sử dụng',
                            slug_trangthai:'outdated'
                        });

                        let props={
                            id_giohang:req.cart.id_giohang,
                            gia:0
                        }

                        result = await detailCartRemove(props);

                    }

                }
                else if(statusPresents[i].slug_trangthai === "not_used"){
                    
                    const idPresent=statusPresents[0].id_present;

                    result=await presentGetAll({id:idPresent});

                    if(result === null)
                        return res.status(401).send("Something wrong please try again");
                    
                    const present=result[0];

                    const startDate=new Date(present.ngay_batdau);
                    const endDate=new Date(present.ngay_ketthuc);
                    const today=new Date();
                    today.setHours(today.getHours()+7);

                    if(today < startDate){
                        payload.voucherErrorCode=1;
                        payload.voucherMessage='Voucher hiện tại chưa thể sử dụng';
                    }
                    else if(today <= endDate){
                        payload.voucherErrorCode=0;

                        props={
                            id_present:present.id
                        }

                        result = await voucherGetAll(props);

                        if(result === null)
                            return res.status(401).send("Something wrong, please try again");
                        
                        const idProducts=result.map(item=>{
                            return item.id_sanpham;
                        });

                        props={
                            id_sanpham:idProducts
                        }

                        const products = await productGetAll(props);

                        props=result.map(item=>{

                            return {
                                id_giohang:req.cart.id_giohang,
                                id_sanpham:item.id_sanpham,
                                gia:0,
                                soluong:item.so_luong
                            }
                        })
                        
                        result=await detailCartMuliCreate(props);

                        const giftProducts=products.map((item)=>{

                            function findDetailCart(idSanpham,detailCarts){

                                for(let i=0;i<detailCarts.length;++i){
                                    if(detailCarts[i].id_sanpham === idSanpham)
                                        return detailCarts[i];
                                }
                            }
                            const detailCart=findDetailCart(item.id_sanpham,result);
                            return{
                                id_detailcart:detailCart.null,
                                link_sanpham:`product-details?id=${item.id_sanpham}`,
                                thumbnail:item.thumbnail,
                                ten_sanpham:item.ten_sanpham+" (Voucher)",
                                id_sanpham:item.id_sanpham,
                                gia:0,
                                so_luong:detailCart.soluong,
                                tong_cong:0
                            }
                        });

                        payload.giftProducts=giftProducts;

                        result=await customerPresentUpdate({
                            id:statusPresents[0].id,
                            trang_thai:'Chuẩn bị sử dụng',
                            slug_trangthai:'pending'
                        });
                    }
                    else{
                        payload.voucherErrorCode=1;
                        payload.voucherMessage='Voucher hiện tại không thể sử dụng';

                        result=await customerPresentUpdate({
                            id:statusPresents[0].id,
                            trang_thai:'Không thể sử dụng',
                            slug_trangthai:'outdated'
                        });
                    }
                }
            }
        }
        else{
            payload.voucherErrorCode=1;
            payload.voucherMessage='Hiện tại không có voucher dành cho quý khách';
        }
    }
    else if(voucherIdCustomerPresent !== -1){
        payload.voucherErrorCode=0;
        let props={
            id:voucherIdCustomerPresent,
            trang_thai:'Chưa sử dụng',
            slug_trangthai:'not_used'
        }
    
        await customerPresentUpdate(props);

        props={
            id_giohang:req.cart.id_giohang,
            gia:0
        }

        await detailCartRemove(props);

    }

    const cart=req.cart;
    
    let subTotal=0;

    const detailCarts=await detailCartGetAll({
        id_giohang:cart.id_giohang,
    });

    detailCarts.forEach(item=>{

        subTotal+=item.gia*item.soluong;
    });
    
    subTotal=Math.round(subTotal);

    payload.subTotal=subTotal;

    result=await cartUpdate({id_giohang:cart.id_giohang,tong_tien:subTotal})

    if(result === null){

        return res.status(401).send("Oops something wrong");
    }
    
    if(hasDiscount === true){
        payload.discountErrorCode=0;
        payload.discount=0;
        let props={
            id:discountIdCustomerPresent
        }
    
        const statusPresents=await customerPresentGetAll(props);
    
        if(statusPresents === null)
            return res.status(401).send("Something wrong please try again");

        if(statusPresents.length > 0){
            const idPresent=statusPresents[0].id_present;

            result=await presentGetAll({id:idPresent});

            if(result === null)
                return res.status(401).send("Something wrong please try again");
            
            const present=result[0];

            const startDate=new Date(present.ngay_batdau);
            const endDate=new Date(present.ngay_ketthuc);
            const today=new Date();
            today.setHours(today.getHours()+7);

            if(today < startDate){
                payload.discountErrorCode=1;
                payload.discountMessage='Discount hiện tại chưa thể sử dụng';
            }
            else if(today <= endDate){

                let count=0;

                detailCarts.forEach(item=>{
                    if(item.gia > 0){
                        count+=1;
                    }
                })

                if(count === 0){
                    payload.discountErrorCode=-1;
                    payload.discountMessage='Không thể dùng discount vì Cart của bạn hiện tại chưa có món hàng nào';
                
                    result=await customerPresentUpdate({
                        id:statusPresents[0].id,
                        trang_thai:'Chưa sử dụng',
                        slug_trangthai:'not_used'
                    });
                }
                else{
                    payload.discountErrorCode=0;

                    payload.discount=present.so_tien;

                    result=await customerPresentUpdate({
                        id:statusPresents[0].id,
                        trang_thai:'Chuẩn bị sử dụng',
                        slug_trangthai:'pending'
                    });
                }
            }
            else{
                payload.discountErrorCode=1;
                payload.discountMessage='Discount hiện tại không thể sử dụng';

                result=await customerPresentUpdate({
                    id:statusPresents[0].id,
                    trang_thai:'Không thể sử dụng',
                    slug_trangthai:'outdated'
                });
            }
        }
    
    }
    else if(discountIdCustomerPresent !== -1){
        payload.discount=0;
        payload.discountErrorCode=0;

        let props={
            id:discountIdCustomerPresent,
            trang_thai:'Chưa sử dụng',
            slug_trangthai:'not_used'
        }
    
        await customerPresentUpdate(props);
    }

    payload.checkout=detailCarts.length > 0 ? true:false;

    return res.status(200).send(payload);
}

exports.renderCartPage=async (req,res)=>{

    if(!req.uuid){

        return res.status(401).send("Something wrong,please try again");
    }

    const cart=req.cart;

    if(cart === null){

        return res.status(401).send("Something wrong,please try again");
    }

    let props={
        id_khachhang:req.customer.id_khachhang,
        slug_trangthai:['not_used','pending']
    }

    const statusPresents=await customerPresentGetAll(props);

    if(statusPresents === null)
        return res.status(401).send("Something wrong please try again");

    let detailCart=await detailCartGetAll({
        id_giohang:cart.id_giohang,
    });

    if(detailCart === null){
        return res.status(401).send("Something wrong,please try again");
    }
    else if(detailCart.length === 0){

        let count=0;

        for(let i=0;i<statusPresents.length;++i){

            const idPresent=statusPresents[i].id_present;
    
            result=await presentGetAll({id:idPresent});

            if(result === null)
                return res.status(401).send("Something wrong please try again");

            const present=result[0];

            const startDate=new Date(present.ngay_batdau);
            const endDate=new Date(present.ngay_ketthuc);
            const today=new Date();
            today.setHours(today.getHours()+7);

            if(statusPresents[i].loai === "voucher"){
                if(today < startDate){

                }
                else if(today <= endDate){
    
                    count+=1;
                }
                else{
    
                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });
                }
            }
            else if(statusPresents[i].loai === "discount"){

                if(today < startDate){
                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });
                }
                else if(today <= endDate){
    
                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });
                }
                else{
    
                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });
                }
            }
            
        }
        
        if (count === 0){
            try {
                const result=await isAuth(req); 
                return res.render('cart',{auth:result,empty:true});
            } catch (error) {
                console.log(error);
                return;
            }
        }
        
    }
    let hasDiscount=false;
    let hasVoucher=false;
    let discountPrice=0;
    let discountIdCustomerPresent=-1;
    let voucherIdCustomerPresent=-1;
    let discountPendingOrNot=false;
    let voucherPendingOrNot=false;
    
    if(statusPresents.length > 0){

        for(let i=0;i<statusPresents.length;++i){

            if(statusPresents[i].loai === "discount"){
                const idPresent=statusPresents[i].id_present;

                result=await presentGetAll({id:idPresent});

                if(result === null)
                    return res.status(401).send("Something wrong please try again");
            
                const present=result[0];

                const startDate=new Date(present.ngay_batdau);
                const endDate=new Date(present.ngay_ketthuc);
                const today=new Date();
                today.setHours(today.getHours()+7);

                if(today < startDate){
                    hasDiscount=false;
                }
                else if(today <= endDate){
                    hasDiscount=true;
                    discountIdCustomerPresent=statusPresents[i].id;

                    let count=0;

                    detailCart.forEach(item=>{
                        if(item.gia > 0)
                            count+=1;
                    });

                    if(count === 0){
                        result=await customerPresentUpdate({
                            id:statusPresents[i].id,
                            trang_thai:'Chưa sử dụng',
                            slug_trangthai:'not_used'
                        });

                        discountPendingOrNot=false;
                    }
                    else{
                        
                        discountPendingOrNot=statusPresents[i].slug_trangthai === "pending" ? true:false;
                        if(discountPendingOrNot)
                            discountPrice=present.so_tien;
                    }
                }
                else{
                    hasDiscount=false;

                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });
                }
            }
            else if (statusPresents[i].loai === "voucher"){
                const idPresent=statusPresents[i].id_present;

                result=await presentGetAll({id:idPresent});

                if(result === null)
                    return res.status(401).send("Something wrong please try again");

                const present=result[0];

                const startDate=new Date(present.ngay_batdau);
                const endDate=new Date(present.ngay_ketthuc);
                const today=new Date();
                today.setHours(today.getHours()+7);
                
                if(today < startDate){

                    hasVoucher=false;
                }
                else if(today <= endDate){

                    voucherIdCustomerPresent=statusPresents[i].id;
                    hasVoucher=true;
                    voucherPendingOrNot=statusPresents[i].slug_trangthai === "pending" ? true:false;
                }
                else{

                    hasVoucher=false;

                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });

                    let props={
                        id_giohang:req.cart.id_giohang,
                        gia:0
                    }

                    result = await detailCartRemove(props);
                }
            }

        }
    }

    detailCart=await detailCartGetAll({id_giohang:cart.id_giohang})

    const idProduct=detailCart.map(item=>item.id_sanpham);

    const products=await productGetAll({id_sanpham:idProduct});

    let subTotal=0;
    let payload=[];
    let giftProducts=[];
    
    for(let i=0;i<detailCart.length;++i){
        
        function findProduct(id,products){

            for(let i=0;i<products.length;++i){
                if(products[i].id_sanpham === id)
                    return products[i];
            }

        }

        if(detailCart[i].gia > 0){
            
            subTotal+=detailCart[i].soluong*detailCart[i].gia;
    
            const product=findProduct(detailCart[i].id_sanpham,products);
       
            payload.push ({
                id_sanpham:product.id_sanpham,
                thumbnail:product.thumbnail,
                ten_sanpham:product.ten_sanpham,
                gia:detailCart[i].gia,
                so_luong:detailCart[i].soluong,
                tong_cong:Math.round(detailCart[i].soluong*detailCart[i].gia),
                id_detailcart:detailCart[i].id_giohangchitiet,
                link_sanpham:`/product-details?id=${product.id_sanpham}`,
            });
        }
        else{

            const product=findProduct(detailCart[i].id_sanpham,products);
       
            giftProducts.push ({
                id_sanpham:product.id_sanpham,
                thumbnail:product.thumbnail,
                ten_sanpham:product.ten_sanpham+" (Voucher)",
                gia:0,
                so_luong:detailCart[i].soluong,
                tong_cong:0,
                id_detailcart:detailCart[i].id_giohangchitiet,
                link_sanpham:`/product-details?id=${product.id_sanpham}`,
            });
        }
    }


    subTotal=Math.ceil(subTotal);
    
    result=await isAuth(req);
    
    return res.render('cart',{
        data:payload,
        giftProducts:giftProducts,
        auth:result,
        empty:false,
        subTotal:subTotal,
        total:Math.round(subTotal*(1-(discountPrice/100))) ,
        hasDiscount:hasDiscount,
        discount:discountPrice,
        discountPendingOrNot:discountPendingOrNot,
        discountIdCustomerPresent:discountIdCustomerPresent,
        hasVoucher:hasVoucher,
        voucherPendingOrNot:voucherPendingOrNot,
        voucherIdCustomerPresent:voucherIdCustomerPresent,
        checkout:detailCart.length > 0 ? true:false,
        // cities:cities
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

    let detailCart=await detailCartGetAll({id_giohang:cart.id_giohang});

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

    let props={
        id_khachhang:req.customer.id_khachhang,
        slug_trangthai:'pending'
    }

    const statusPresents=await customerPresentGetAll(props);

    let discount=0;
    
    if(statusPresents === null)
        return res.status(401).send('Something wrong please try again');

    if(statusPresents.length > 0){

        for(let i=0;i<statusPresents.length;++i){

            const idPresent=statusPresents[i].id_present;

            result=await presentGetAll({id:idPresent});

            if(result === null)
                return res.status(401).send("Something wrong please try again");

            const present=result[0];

            const startDate=new Date(present.ngay_batdau);
            const endDate=new Date(present.ngay_ketthuc);
            const today=new Date();
            today.setHours(today.getHours()+7);
            
            if(statusPresents[i].loai === "discount"){

                if(today < startDate){
                }
                else if(today <= endDate){    
                    let count=0;

                    detailCart.forEach(item=>{
                        if(item.gia > 0)
                            count+=1;
                    });

                    if(count === 0){
                        result=await customerPresentUpdate({
                            id:statusPresents[i].id,
                            trang_thai:'Chưa sử dụng',
                            slug_trangthai:'not_used'
                        });

                    }
                    else{
                        
                        discount=present.so_tien;
                    }        
                }
                else{

                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });
                }   
            }
            else if(statusPresents[i].loai === "voucher"){
                
                if(today < startDate){
                }
                else if(today <= endDate){
                }
                else{

                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });

                    let props={
                        id_giohang:req.cart.id_giohang,
                        gia:0
                    }

                    result = await detailCartRemove(props);
                }
            }
        }
    }

    detailCart=await detailCartGetAll({id_giohang:cart.id_giohang});

    const idProduct=detailCart.map(item=>item.id_sanpham);

    const products=await productGetAll({id_sanpham:idProduct});

    let subTotal=0;

    let giftProducts=[];
    let payload=[];
    
    for(let i=0;i<detailCart.length;++i){
        
        function findProduct(id,products){

            for(let i=0;i<products.length;++i){
                if(products[i].id_sanpham === id)
                    return products[i];
            }

        }

        if(detailCart[i].gia > 0){
            
    
            subTotal+=detailCart[i].soluong*detailCart[i].gia;
    
            const product=findProduct(detailCart[i].id_sanpham,products);
       
            payload.push ({
                id_sanpham:product.id_sanpham,
                thumbnail:product.thumbnail,
                ten_sanpham:product.ten_sanpham,
                gia:detailCart[i].gia,
                so_luong:detailCart[i].soluong,
                tong_cong:Math.round(detailCart[i].soluong*detailCart[i].gia),
                id_detailcart:detailCart[i].id_giohangchitiet,
                link_sanpham:`/product-details?id=${product.id_sanpham}`,
            });
        }
        else{

            const product=findProduct(detailCart[i].id_sanpham,products);
       
            giftProducts.push ({
                id_sanpham:product.id_sanpham,
                thumbnail:product.thumbnail,
                ten_sanpham:product.ten_sanpham+" (Voucher)",
                gia:0,
                so_luong:detailCart[i].soluong,
                tong_cong:0,
                id_detailcart:detailCart[i].id_giohangchitiet,
                link_sanpham:`/product-details?id=${product.id_sanpham}`,
            });
        }
    }

    subTotal=Math.round(subTotal);
    const total=Math.round(subTotal*(1-(discount/100)));

    const cities=await cityGetAll({});

    result=await isAuth(req);

    return res.render('checkout',{
        data:payload,
        giftProducts:giftProducts,
        subTotal:subTotal,
        total:total,
        id_cart:cart.id_giohang,
        checkout:true,
        auth:result,
        cities:cities,
        discount:discount,
    });
}

exports.checkout=async (req,res)=>{
    let result=null;
    let voucher=false;
    let nameVoucher="";
    let shopping=false;
    const cart=req.cart;

    console.log(req.body);

    let detailCart=await detailCartGetAll({id_giohang:cart.id_giohang});

    if(detailCart === null){
        return res.status(401).send("Something wrong please try again");
    }

    if(detailCart.length === 0){
        return res.status(401).send("Can not check out for an empty cart!");
    }

    detailCart.every(item=>{
        if(item.gia > 0){
            shopping=true;
            return true;
        }
    
    });

    const {
        email,
        name,
        phone,
        sonha,
        street,
        ward,
        district,
        city,
        idcity,
        province,
        message,
        methodPayment,
        statusPayment
    }=req.body;

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

    const idProduct=detailCart.map(item=>item.id_sanpham);

    const products=await productGetAll({id_sanpham:idProduct});
    
    let total=0;

    for(let i=0;i<detailCart.length;++i){

        total+=Math.round(detailCart[i].gia*detailCart[i].soluong);
        
        function findProduct(id,products){

            for(let i=0;i<products.length;++i){
                if(products[i].id_sanpham === id)
                    return products[i];
            }

        }

        const product=findProduct(detailCart[i].id_sanpham,products);

        payload={
            soluong_tonkho:product.soluong_tonkho-detailCart[i].soluong,
            soluong_daban:product.soluong_daban+detailCart[i].soluong,
            id_sanpham:product.id_sanpham
        }

        result=await productUpdate(payload);
    }

    let props={
        id_khachhang:req.customer.id_khachhang,
        slug_trangthai:'pending'
    }

    const statusPresents=await customerPresentGetAll(props);

    if(statusPresents === null)
        return res.status(401).send("Something wrong please try again");

    let discountPrice=0;
    if(statusPresents.length > 0){
        
        for(let i=0;i<statusPresents.length;++i){

            const idPresent=statusPresents[i].id_present;

            result=await presentGetAll({id:idPresent});

            if(result === null)
                return res.status(401).send("Something wrong please try again");
            
            const present=result[0];

            const startDate=new Date(present.ngay_batdau);
            const endDate=new Date(present.ngay_ketthuc);
            const today=new Date();
            today.setHours(today.getHours()+7);

            if(statusPresents[i].loai === "discount"){
                
                if(today < startDate){
                }
                else if(today <= endDate){

                    let count=0;

                    detailCart.forEach(item=>{
                        if(item.gia > 0)
                            count+=1;
                    });

                    if(count === 0){
                        result=await customerPresentUpdate({
                            id:statusPresents[i].id,
                            trang_thai:'Chưa sử dụng',
                            slug_trangthai:'not_used'
                        });

                    }
                    else{
                        
                        discountPrice=present.so_tien;

                        result=await customerPresentUpdate({
                            id:statusPresents[i].id,
                            trang_thai:'Đã sử dụng',
                            slug_trangthai:'used'
                        });
                    }      
                    
                }
                else{
                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });
                }
            }
            else if(statusPresents[i].loai === "voucher"){
                
                if(today < startDate){
                }
                else if(today <= endDate){
                    voucher=true;
                    nameVoucher=present.ten;
                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Đã sử dụng',
                        slug_trangthai:'used'
                    });
                }
                else{
                    result=await customerPresentUpdate({
                        id:statusPresents[i].id,
                        trang_thai:'Không thể sử dụng',
                        slug_trangthai:'outdated'
                    });

                    result=await detailCartRemove({
                        id_giohang:cart.id_giohang,
                        gia:0
                    });
                }
            }
        }
    }

    total=Math.round(total*(1-(discountPrice/100)));
    
    var today = new Date();
    today.setHours(today.getHours()+7);
    const dateTime=today.toISOString();
    
    payload={
        id_diachi:address.id_diachi,
        id_giohang:cart.id_giohang,
        tong_tien:total,
        ngay_dat:dateTime,
        check_out:true,
        phuongthuc_thanhtoan:methodPayment,
        trangthai_thanhtoan:statusPayment
    }
    result=await cartUpdate(payload);

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

    let cities=await cityGetAll({id:idcity});
    cities=cities[0];

    const statusShipping=await statusShippingGetAll({slug:'shipping'});
    payload={
        trang_thai:statusShipping[0].id,
        ngay_nhan:dateTime,
        gia:cities.gia_ship,
        id_giohang:cart.id_giohang,
        mieu_ta:message
    }

    const shipping=await shippingCreate(payload);

    if(shipping===null){
        return res.status(401).send("Something wrong please try again");
    }

    res.status(200).send({
        id:cart.id_giohang,
        methodPayment:methodPayment,
        statusPayment:statusPayment,
        total:total,
        shopping:shopping,
        voucher:voucher,
        nameVoucher:nameVoucher
    });
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
/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-20 23:41:13
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-21 13:33:18
 */

const {remove:detailCartRemove,update:detailCartUpdate}=require('./service/giohangchitiet');
const {update:cartUpdate,getAll: cartGetAll}=require('./service/giohang');
const { getAll: customerGetAll } = require('./service/khachhang');

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
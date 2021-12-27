/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-20 23:41:13
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-28 01:07:47
 */

// const {remove:detailCartRemove,update:detailCartUpdate}=require('./service/giohangchitiet');
// const {update:cartUpdate,getAll: cartGetAll}=require('./service/giohang');
// const { getAll: customerGetAll } = require('./service/khachhang');
const { getByPk } = require('./service/sanpham');
const { getAllByProduct } = require('./service/hinhanh');
const {getAll:reviewGetAll,create:reviewCreate,getByPk:reviewGetByPk}=require('./service/review');

// exports.handleDetailCart=async (req,res)=>{

//     const uuid=req.cookies.auth;
//     if(!uuid){
//         return res.redirect('/cart');
//     }

//     if(req.query.method === 'delete'){

//         const id=req.query.id;

//         const result=await detailCartRemove({id_giohangchitiet:id});

//         if(result === null){
//             console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
//         }
//         res.redirect('/cart');

//     }
//     else if(req.query.method === 'post'){

//         const id=req.query.id;

//         const amount=req.body.amount;

//         const prevAmount=req.body.prevAmount;

//         const price=req.body.price;

//         const result=await detailCartUpdate({soluong:parseInt(amount),id_giohangchitiet:id});

//         if(result === null){

//             return res.status(401).send("Oops something wrong");
//         }

//         let id_khachhang = await customerGetAll({ uuid: uuid });

//         if (id_khachhang === null)
//             return res.status(401).send("Something wrong please try again");
//         else
//             id_khachhang = id_khachhang[0].id_khachhang;

//         let payload = {
//             id_khachhang: id_khachhang,
//             check_out: false,
//         };


//         let cart=await cartGetAll(payload);

//         if (cart !== null)
//             cart = cart[0];
//         else {
//             res.status(401).send('Something wrong while retrieving giohang')
//         }

//         payload={
//             id_giohang:cart.id_giohang,
//             tong_tien:cart.tong_tien+parseInt(price)*(amount-prevAmount)
//         }

//         const _result=await cartUpdate(payload);

//         if(_result === null){
//             return res.status(401).send("Oops something wrong");
//         }

//         return res.status(200).send("OK");
//     }
// }

exports.renderProductDetail = async (req, res) => {

    if (!req.query.id) {
        return res.redirect('/');
    }

    console.log(req.query.id);
    console.log(typeof req.query.id);

    let result=null;

    try {
        result = await getByPk(parseInt(req.query.id));
    
    } catch (error) {
        console.log(error);    
        return res.redirect('/');
    }

    const data = {};
    let resu=null;
    try {
        resu = await getAllByProduct(result.data.id_sanpham)
        
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }

    const detailImg = resu.url[0].url;
    resu.url.splice(0, 1);
    const similarImg = resu.url.map(item => item.url);

    const name = result.data.ten_sanpham;
    const id = result.data.id_sanpham;

    const price = result.data.gia_sanpham;

    const availability = result.data.soluong_tonkho > 0 ? 'In Stock' : 'Sold out';

    data.detailImg = detailImg;
    data.similarImg = similarImg;
    data.name = name;
    data.id = id;
    data.price = price;
    data.availability = availability;

    console.log(data);

    const reviews=await reviewGetAll({id_sanpham:result.data.id_sanpham});

    if(reviews !== null){


        if(reviews.length > 0){
            
            const review=reviews.map(item=>{

                const myDate=new Date(item.created_at);
                // const myArray=item.created_at.split(" ");
                    
                const hour=`${myDate.getUTCHours()}:${myDate.getUTCMinutes()}:${myDate.getUTCSeconds()}`;
                const date=`${myDate.getUTCDate()}/${myDate.getUTCMonth()}/${myDate.getUTCFullYear()}`;

                return {
                    name:item.name,
                    hour:hour,
                    date:date,
                    description:item.description
                }

            });

            console.log(review);

            return res.render('product-details', { data: data,reviews:review });
        }

        
    }

    return res.render('product-details', { data: data});

}

exports.addReview=async (req,res)=>{

    if(!req.cookies.uuid){

        return res.status(401).send("Not able to identify");
    }

    if(!req.query.product){
        return res.status(401).send("Not able to detect whether product is");
    }

    const id_product=req.query.product;
    const email=req.body.email;
    const name=req.body.name;
    const description=req.body.description;

    const result=await reviewCreate({
        id_sanpham:id_product,
        email:email,
        name:name,
        description:description
    });

    if (result === null){
        return res.status(401).send("Something wrong please try again");
    }

    const review=await reviewGetByPk(result.null);

    if(review !== null){
        return res.status(200).send(review);
    }

    return res.status(401).send("Something wrong please try again");
    
}
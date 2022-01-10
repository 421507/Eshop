/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 23:11:33
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 14:53:43
 */

const{
    getAll:presentGetAll,
    getByPk:presentGetByPk,
    update:presentUpdate,
    create:presentCreate,
    remove:presentRemove
}=require('../service/present');
const{
    getAll:voucherGetAll,
    createOrUpdate:voucherCreateOrUpdate
}=require('../service/voucher');
const{
    _getAll:productGetAll
}=require('../service/sanpham');
const{
    increaseExpireDate:customerPresentIncrease
}=require('../service/khachhang_present');

exports.renderListing=async (req,res)=>{
    
    const _presents=await presentGetAll({});

    const presents=_presents.map(item=>{

        return {
            id:item.id,
            name:item.ten,
            start:new Date(item.ngay_batdau).toLocaleString(),
            end:new Date(item.ngay_ketthuc).toLocaleString(),
            type:item.loai
        }
    });

    const payload={
        presents:presents
    }


    return res.render('admin/presents',{
        layout:'admin',
        auth:true,
        data:payload
    });

}

exports.renderDetail=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin');

    const present=await presentGetByPk(id);

    if(present === null){

        return res.redirect('/admin');
    }
    
    let nonSelectProducts=[];
    let selectProducts=[];
    if(present.loai === "voucher"){

        const vouchers=await voucherGetAll({id_present:present.id});

        const _products=await productGetAll({});

        _products.forEach(item=>{

            function getVoucher(id){
                for (let index = 0; index < vouchers.length; index++) {
                    const element = vouchers[index];
                    if(element.id_sanpham === id)
                        return element;
                }
                return null;
            }
            const voucher=getVoucher(item.id_sanpham);
            if(voucher !== null){
                selectProducts.push({
                    id:item.id_sanpham,
                    price:item.gia_sanpham,
                    amount:voucher.so_luong,
                    name:item.ten_sanpham
                });
            }
            else{
                nonSelectProducts.push({
                    id:item.id_sanpham,
                    price:item.gia_sanpham,
                    amount:0,
                    name:item.ten_sanpham
                });
            }
        });
    }

    const startObj=new Date(present.ngay_batdau);
    startObj.setHours(startObj.getHours()+7);
    const endObj=new Date(present.ngay_ketthuc);
    endObj.setHours(endObj.getHours()+7);

    const payload={
        id:present.id,
        name:present.ten,
        dateCreate:startObj.toISOString().substring(0,startObj.toISOString().indexOf('.')),
        dateEnd:endObj.toISOString().substring(0,endObj.toISOString().indexOf('.')),
        isDiscount: present.loai === "discount" ? true:false,
        isVoucher: present.loai === "voucher" ? true:false,
        price:present.so_tien,
        amount:present.so_luong,
        type:present.loai,
        selectProducts:selectProducts,
        nonSelectProducts:nonSelectProducts
    }

    return res.render('admin/present-detail',{
        layout:'admin',
        auth:true,
        data:payload
    });

}

exports.update=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const present=await presentGetByPk(id);

    if(present === null)
        return res.status(401).send("Invalid ID");

    const type=req.body.type;
    const name=req.body.name;
    const start=req.body.start;
    const end=req.body.end;
    const amount=req.body.amount;
    
    if(type === "discount"){

        const discount=req.body.discount;

        let result=await presentUpdate({
            id:id,
            ten:name,
            ngay_batdau:start,
            ngay_ketthuc:end,
            so_luong:amount,
            so_tien:discount
        });

        if(result === null)
            return res.status(401).send("Something wrong please try again");

        const now=new Date();
        const endObj=new Date(end);

        if(now <= endObj){
            result =await customerPresentIncrease({
                id_present:id,
            });

            if(result === null)
                return res.status(400).send("Something wrong please try again");
        }
    }
    else if(type === "voucher"){

        const vouchers=req.body.vouchers;

        result=await voucherCreateOrUpdate({
            id_present:id,
            vouchers:vouchers
        });

        if(result === null)
            return res.status(400).send("Something wrong please try again");
        const now=new Date();
        const endObj=new Date(end);

        if(now <= endObj){
            result =await customerPresentIncrease({
                id_present:id,
            });

            if(result === null)
                return res.status(400).send("Something wrong please try again");
        }
    }

    return res.status(200).send("OK");
}

exports.renderAdd=async (req,res)=>{

    const _products=await productGetAll({});

    const products=_products.map(item=>{

            return{
                id:item.id_sanpham,
                price:item.gia_sanpham,
                amount:0,
                name:item.ten_sanpham
            };
        });

    const payload={
        types:[
            {
                name:"discount"
            },
            {
                name:"voucher"
            }
        ],
        products:products
    }


    return res.render('admin/add-present',{
        auth:true,
        layout:'admin',
        data:payload
    });


}

exports.create=async (req,res)=>{
    console.log(req.body);
    const type=req.body.type;
    const name=req.body.name;
    const start=req.body.start;
    const end=req.body.end;
    const amount=req.body.amount;

    if(type === 'discount'){

        const price=req.body.price;
        const result=await presentCreate({
            ten:name,
            ngay_batdau:start,
            ngay_ketthuc:end,
            so_luong:amount,
            so_tien:price,
            loai:type
        });

        if(result === null)
            return res.status(401).send("Something wrong please try again");
    }
    else{
        const result=await presentCreate({
            ten:name,
            ngay_batdau:start,
            ngay_ketthuc:end,
            so_luong:amount,
            vouchers:req.body.vouchers,
            loai:type
        });

        if(result === null)
            return res.status(401).send("Something wrong please try again");
    }
    return res.status(200).send("OK");
}

exports.remove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null){
        return res.status(401).send("ID not found");
    }

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const result=await presentRemove({
        id:id
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}
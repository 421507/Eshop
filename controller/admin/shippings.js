/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-06 20:06:02
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 02:52:13
 */

const{
    getByPk:shippingGetByPk,
    update:shippingUpdate,
    shippingCancelled
}=require('../service/shipping');
const{
    getByPk:addressGetByPk,
    update:addressUpdate
}=require('../service/diachi');
const{
    getAll:cityGetAll,
    getByPk:cityGetByPk
}=require('../service/thanhpho');
const{
    getAll:statusShippingGetAll,
    getByPk:statusShippingGetByPk
}=require('../service/trangthaigiaohang');


exports.renderPage=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin');

    const shipping=await shippingGetByPk(id);

    if(shipping === null){

        return res.redirect('/admin');

    }

    const address=await addressGetByPk(shipping.id_diachi);

    const _cities=await cityGetAll({});
    const _status=await statusShippingGetAll({});

    const cities=_cities.map(item=>{

        if(item.slug === address.thanh_pho){
            return {
                id:item.id,
                name:item.ten_thanhpho,
                selected:true
            }
        }
        else{
            return {
                id:item.id,
                name:item.ten_thanhpho,
                selected:false
            }
        }
    });

    const status=_status.map(item=>{

        if(item.id === shipping.trang_thai){
            return {
                id:item.id,
                name:item.ten_trangthai,
                selected:true
            }
        }
        else{
            return {
                id:item.id,
                name:item.ten_trangthai,
                selected:false
            }
        }
    });

    const payload={
        id:shipping.id_shipping,
        shipperName:shipping.ten_shipper !== undefined && shipping.ten_shipper !== null ? shipping.ten_shipper : "",
        description:shipping.mieuta !== undefined && shipping.mieuta !== null ? shipping.mieuta : "",
        dateCreate:new Date(shipping.ngay_nhan).toLocaleString(),
        dateEnd:shipping.ngay_ketthuc !== undefined && shipping.ngay_ketthuc !== null ? new Date(shipping.ngay_ketthuc).toLocaleString() : "",
        numHouse:address.so_nha !== undefined && address.so_nha !== null ? address.so_nha : "",
        street:address.ten_duong !== undefined && address.ten_duong !== null ? address.ten_duong : "",
        ward:address.phuong !== undefined && address.phuong !== null ? address.phuong : "",
        district:address.quan !== undefined && address.quan !== null ? address.quan : "",
        province:address.tinh !== undefined && address.tinh !== null ? address.tinh : "",
        cities:cities,
        status:status,
        price:shipping.gia,
        cart:shipping.id_giohang
    }

    return res.render('admin/shipping-detail',{
        auth:true,
        layout:'admin',
        data:payload
    });

}

exports.update=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || parseInt(id) < 1)
        return res.status(401).send("Invalid ID");

    const shipping=await shippingGetByPk(id);

    if(shipping === null){

        return res.status(401).send("Invalid ID");
    }
    const nameShipper=req.body.nameShipper;
    const description=req.body.description;
    const numHouse=req.body.numHouse;
    const street=req.body.street;
    const ward=req.body.ward;
    const district=req.body.district;
    const province=req.body.province;
    const idCity=req.body.idCity;
    const idStatus=req.body.idStatus;
    const id_giohang=req.body.id_giohang;

    const city=await cityGetByPk(idCity);

    let result=await addressUpdate({
        so_nha:numHouse,
        ten_duong:street,
        phuong:ward,
        quan:district,
        thanh_pho:city.slug,
        tinh:province,
        id_diachi:shipping.id_diachi,
    });

    if(result === null)
        return res.status(401).send("Something wrong please again");

    const status=await statusShippingGetByPk(idStatus);
    const price=city.gia_ship;

    if(status.slug === "shipped"){

        const now=new Date();

        result=await shippingUpdate({
            id_shipping:shipping.id_shipping,
            ten_shipper:nameShipper,
            trang_thai:idStatus,
            ngay_ketthuc:now.toISOString(),
            gia_ship:price,
            mieu_ta:description,
            id_giohang:id_giohang
        });

        if(result === null)
            return res.status(401).send("Something wrong please again");        
    }
    else if(status.slug === "cancelled"){
        const now=new Date();

        result=await shippingCancelled({
            id_shipping:shipping.id_shipping,
            ten_shipper:nameShipper,
            trang_thai:idStatus,
            ngay_ketthuc:now.toISOString(),
            gia_ship:price,
            mieu_ta:description,
            id_giohang:id_giohang
        });

        if(result === null)
            return res.status(401).send("Something wrong please again");
    }
    else{
        result=await shippingUpdate({
            id_shipping:shipping.id_shipping,
            ten_shipper:nameShipper,
            trang_thai:idStatus,
            gia_ship:price,
            mieu_ta:description
        });

        if(result === null)
            return res.status(401).send("Something wrong please again");
    }

    return res.status(200).send("OK");
}
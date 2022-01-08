/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 02:35:55
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 11:26:29
 */
const{
    getAll:shippingGetAll
}=require('../service/shipping');
const{
    getAll:addressGetAll
}=require('../service/diachi');
const{
    getAll:statusShippingGetAll
}=require('../service/trangthaigiaohang');
const{
    getAll:cityGetAll,
}=require('../service/thanhpho');
const{
    getAll:gopYGetAll,
}=require('../service/gopy');


exports.renderHomePage = async (req, res) => {

    const user=req.user;

    const _shippings=await shippingGetAll({});

    const idAddresses=_shippings.map(item=>{
        return item.id_diachi;
    });

    const _addresses=await addressGetAll({
        id_diachi:idAddresses
    });

    const _statusShippings=await statusShippingGetAll({});

    const _cities=await cityGetAll({});

    const shippings=_shippings.map(item=>{

        function getStatusShipping(id){

            for(let i=0;i<_statusShippings.length;++i){
                if(_statusShippings[i].id === id)
                    return _statusShippings[i];
            }
        }

        function getAddress(id){
            for(let i=0;i<_addresses.length;++i){
                if(_addresses[i].id_diachi === id)
                    return _addresses[i];
            }
        }

        function getCity(slug){
            for(let i=0;i<_cities.length;++i){
                if(_cities[i].slug === slug)
                    return _cities[i];
            }
        }

        const address=getAddress(item.id_diachi);
        const status=getStatusShipping(item.trang_thai);
        const city=getCity(address.thanh_pho);

        let moving=false;
        let delivered=false;
        let pending=false;
        let cancelled=false;

        if(status.slug === "shipping"){
            moving=true;
        }
        else if(status.slug === "shipped"){
            delivered=true;
        }
        else if(status.slug === "pending")
            pending=true;
        else if(status.slug === "cancelled")
            cancelled=true;

        return{
            id:item.id_shipping,
            status:status.ten_trangthai,
            shipper:item.ten_shipper !== undefined && item.ten_shipper !== null ? item.ten_shipper : "",
            address:city.ten_thanhpho,
            price:item.gia,
            start:new Date(item.ngay_nhan).toLocaleString(),
            end:item.ngay_ketthuc !== undefined && item.ngay_ketthuc !== null ? new Date(item.ngay_ketthuc).toLocaleString() : "",
            moving:moving,
            delivered:delivered,
            pending:pending,
            cancelled:cancelled
        }

    });

    const _gopy=await gopYGetAll({reply:false});

    const noti=_gopy.map(item=>{
        const now=new Date();
        now.setHours(now.getHours()+7);
        const date=new Date(item.create_at);
        const time=Math.round((now.getTime()-date.getTime())/(3600 * 1000));
        return{
            url:`/admin/noti?id=${item.id}`,
            name:item.name,
            time:time
        }
    });

    const payload={
        name:user.ten,
        shippings:shippings,
        noti:noti
    }
    
    res.render('admin/index', { 
        auth: true,
        layout:'admin',
        data:payload
    });

}
/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 14:07:06
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 04:59:02
 */
const{
    getAll:statusDeliverGetAll,
    getByPk:statusDeliverGetByPk,
    update:statusDeliverUpdate,
    remove:statusDeliverRemove,
    create:statusDeliverCreate
}=require('../service/trangthaigiaohang');
const{
    getAll:statusPaymentGetAll,
    getByPk:statusPaymentGetByPk,
    update:statusPaymentUpdate,
    remove:statusPaymentRemove,
    create:statusPaymentCreate
}=require('../service/trangthaithanhtoan');
const{
    getAll:methodPaymentGetAll,
    getByPk:methodPaymentGetByPk,
    update:methodPaymentUpdate,
    remove:methodPaymentRemove,
    create:methodPaymentCreate
}=require('../service/phuongthucthanhtoan');
const{
    getAll:cityGetAll,
    getByPk:cityGetByPk,
    update:cityUpdate,
    remove:cityRemove,
    create:cityCreate
}=require('../service/thanhpho');

exports.render=async (req,res)=>{

    const _sd=await statusDeliverGetAll({});

    const sd=_sd.map(item=>{

        return{
            id:item.id,
            name:item.ten_trangthai,
            slug:item.slug
        }
    });
    const _st=await statusPaymentGetAll({});

    const st=_st.map(item=>{

        return{
            id:item.id,
            name:item.ten,
            slug:item.slug
        }
    });
    const _mp=await methodPaymentGetAll({});

    const mp=_mp.map(item=>{

        return{
            id:item.id,
            name:item.ten,
            slug:item.slug
        }
    });
    const _cities=await cityGetAll({});

    const cities=_cities.map(item=>{

        return{
            id:item.id,
            name:item.ten_thanhpho,
            zipcode:item.zipcode,
            price:item.gia_ship,
            slug:item.slug
        }
    });

    const payload={
        statusDelivery:sd,
        statusPayment:st,
        methodPayment:mp,
        cities:cities
    }

    return res.render('admin/customize',{
        layout:'admin',
        auth:true,
        data:payload
    });
}

exports.renderStatusDelivery=async (req,res)=>{
    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin');

    const statusDeliver=await statusDeliverGetByPk(id);

    if(statusDeliver === null){

        return res.redirect('/admin');
    }

    const payload={
        id:id,
        status:statusDeliver.ten_trangthai,
        slug:statusDeliver.slug
    }

    return res.render('admin/statusDeliver-detail',{
        layout:'admin',
        auth:true,
        data:payload
    });
}

exports.updateStatusDelivery=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const statusDeliver=await statusDeliverGetByPk(id);

    if(statusDeliver === null){

        return res.status(401).send("Invalid ID");
    }

    const slug=req.body.slug;
    const status=req.body.status;

    let result=await statusDeliverGetAll({slug:slug});

    if(result.length > 0){

        result=await statusDeliverUpdate({
            id:id,
            status:status
        });
    }
    else{
        result=await statusDeliverUpdate({
            id:id,
            status:status,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.removeStatusDelivery=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const statusDeliver=await statusDeliverGetByPk(id);

    if(statusDeliver === null){

        return res.status(401).send("Invalid ID");
    }

    const result=await statusDeliverRemove({id:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.createStatusDelivery=async (req,res)=>{

    const status=req.body.status;
    const slug=req.body.slug;

    let result=await statusDeliverGetAll({slug:slug});

    if(result.length > 0){

        return res.status(401).send("Slug đã tồn tại")
    }
    else{
        result=await statusDeliverCreate({
            ten_trangthai:status,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.renderStatusDeliveryCreate=async (req,res)=>{
    res.render('admin/add-statusdelivery',{
        auth:true,
        layout:'admin'
    });
}

exports.renderStatusPayment=async (req,res)=>{
    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin');

    const statusPayment=await statusPaymentGetByPk(id);

    if(statusPayment === null){

        return res.redirect('/admin');
    }

    const payload={
        id:id,
        name:statusPayment.ten,
        slug:statusPayment.slug
    }

    return res.render('admin/statuspayment-detail',{
        layout:'admin',
        auth:true,
        data:payload
    });
}

exports.updateStatusPayment=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const statusPayment=await statusPaymentGetByPk(id);

    if(statusPayment === null){

        return res.status(401).send("Invalid ID");
    }

    const slug=req.body.slug;
    const name=req.body.name;

    let result=await statusPaymentGetAll({slug:slug});

    if(result.length > 0){

        result=await statusPaymentUpdate({
            id:id,
            ten:name
        });
    }
    else{
        result=await statusPaymentUpdate({
            id:id,
            ten:name,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.removeStatusPayment=async (req,res)=>{
    console.log("AAAAAAAAAAAAAAAAAAAa");
    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const statusPayment=await statusPaymentGetByPk(id);

    if(statusPayment === null){

        return res.status(401).send("Invalid ID");
    }

    const result=await statusPaymentRemove({id:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.createStatusPayment=async (req,res)=>{

    const status=req.body.status;
    const slug=req.body.slug;

    let result=await statusPaymentGetAll({slug:slug});

    if(result.length > 0){

        return res.status(401).send("Slug đã tồn tại")
    }
    else{
        result=await statusPaymentCreate({
            ten:status,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.renderStatusPaymentCreate=async (req,res)=>{
    res.render('admin/add-statuspayment',{
        auth:true,
        layout:'admin'
    });
}

exports.renderMethodPayment=async (req,res)=>{
    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin');

    const methodPayment=await methodPaymentGetByPk(id);

    if(methodPayment === null){

        return res.redirect('/admin');
    }

    const payload={
        id:id,
        name:methodPayment.ten,
        slug:methodPayment.slug
    }

    return res.render('admin/methodpayment-detail',{
        layout:'admin',
        auth:true,
        data:payload
    });
}

exports.updateMethodPayment=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const methodPayment=await methodPaymentGetByPk(id);

    if(methodPayment === null){

        return res.status(401).send("Invalid ID");
    }

    const slug=req.body.slug;
    const name=req.body.name;

    let result=await methodPaymentGetAll({slug:slug});

    if(result.length > 0){

        result=await methodPaymentUpdate({
            id:id,
            ten:name
        });
    }
    else{
        result=await methodPaymentUpdate({
            id:id,
            ten:name,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.removeMethodPayment=async (req,res)=>{
    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const statusPayment=await methodPaymentGetByPk(id);

    if(statusPayment === null){

        return res.status(401).send("Invalid ID");
    }

    const result=await methodPaymentRemove({id:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.createMethodPayment=async (req,res)=>{

    const status=req.body.status;
    const slug=req.body.slug;

    let result=await methodPaymentGetAll({slug:slug});

    if(result.length > 0){

        return res.status(401).send("Slug đã tồn tại")
    }
    else{
        result=await methodPaymentCreate({
            ten:status,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.renderMethodPaymentCreate=async (req,res)=>{
    res.render('admin/add-methodpayment',{
        auth:true,
        layout:'admin'
    });
}


exports.renderCity=async (req,res)=>{
    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin');

    const city=await cityGetByPk(id);

    if(city === null){

        return res.redirect('/admin');
    }

    const payload={
        id:id,
        city:city.ten_thanhpho,
        zipcode:city.zipcode,
        price:city.gia_ship,
        slug:city.slug
    }

    return res.render('admin/city-detail',{
        layout:'admin',
        auth:true,
        data:payload
    });
}

exports.updateCity=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const _city=await cityGetByPk(id);

    if(_city === null){

        return res.status(401).send("Invalid ID");
    }

    const{
        city,zipcode,price,slug
    }=req.body;

    let result=await cityGetAll({slug:slug});
    console.log(result);
    if(result.length > 2){

        return res.status(401).send("Slug đã tồn tại");
        
    }
    else if(result.length >0){
        result=await cityGetAll({zipcode:zipcode});

        if(result.length > 2)

            return res.status(401).send("Zipcode đã tồn tại");

        result=await cityUpdate({
            id:id,
            ten_thanhpho:city,
            zipcode:zipcode,
            gia_ship:price
        });
        
    }
    else{

        result=await cityGetAll({zipcode:zipcode});

        if(result.length > 2)

            return res.status(401).send("Zipcode đã tồn tại");

        result=await cityUpdate({
            id:id,
            ten_thanhpho:city,
            zipcode:zipcode,
            gia_ship:price,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.removeCity=async (req,res)=>{
    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    const city=await cityGetByPk(id);

    if(city === null){

        return res.status(401).send("Invalid ID");
    }

    const result=await cityRemove({id:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.createCity=async (req,res)=>{

    const{
        city,zipcode,price,slug
    }=req.body;

    let result=await cityGetAll({slug:slug});

    if(result.length > 0){

        return res.status(401).send("Slug đã tồn tại");

    }
    else{

        result=await cityGetAll({zipcode:zipcode});

        if(result.length > 0)

            return res.status(401).send("Zipcode đã tồn tại");

            
        result=await cityCreate({
            ten_thanhpho:city,
            zipcode:zipcode,
            gia_ship:price,
            slug:slug
        });
    }

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.renderCityCreate=async (req,res)=>{
    res.render('admin/add-city',{
        auth:true,
        layout:'admin'
    });
}
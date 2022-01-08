/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 11:52:30
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 13:53:46
 */
const e = require('express');
const{
    getAll:customerGetAll,
    getByPk:customerGetByPk,
    update:customerUpdate,
    remove:customerRemove
}=require('../service/khachhang');
const{
    _getAll:userGetAll,
}=require('../service/user');
const{
    getAll:customerPresentGetAll,
}=require('../service/khachhang_present');

exports.renderListing=async (req,res)=>{

    const _customers=await customerGetAll({});

    const customers=_customers.map(item=>{

        return {
            id:item.id_khachhang,
            name:item.ten,
            phone:item.phone,
            email:item.email
        }
    });

    const _cp=await customerPresentGetAll({});

    const cp=_cp.map(item=>{
        return{
            id:item.id,
            customer:item.id_khachhang,
            present:item.id_present,
            status:item.trang_thai
        }
    });

    const payload={
        customers:customers,
        customerPresent:cp
    }

    return res.render('admin/customers',{
        layout:'admin',
        auth:true,
        data:payload
    });

}

exports.renderDetail=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id < 1)
        return res.redirect('/admin');

    const customer=await customerGetByPk(id);

    if(customer === null){

        return res.redirect('/admin');
    }

    const _users=await userGetAll({});

    const users=_users.map(item=>{

        if(customer.id_user !== undefined && customer !== null){
            if(item.id_user === customer.id_user){
                return{
                    selected:true,
                    id:item.id_user,
                    name:item.ten
                }
            }
            else{
                return{
                    selected:false,
                    id:item.id_user,
                    name:item.ten
                }
            }
        }
        else{
            return{
                selected:false,
                id:item.id_user,
                name:item.ten
            }
        }
    });

    const payload={
        user:users,
        name:customer.ten,
        phone:customer.phone,
        email:customer.email,
        uuid:customer.uuid,
        id:id
    }

    return res.render('admin/customer-detail',{
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

    const customer=await customerGetByPk(id);

    if(customer === null)
        return res.status(401).send("Invalid ID");

    const name=req.body.name;
    const phone=req.body.phone;
    const email=req.body.email;
    const uuid=req.body.uuid;
    const user=req.body.user;
    // console.log(req.body);
    let result=await customerUpdate({
        id_khachhang:id,
        uuid:uuid,
        ten:name,
        phone:phone,
        email:email,
        id_user:user === '' ? undefined : user
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.remove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null){
        return res.status(401).send("ID not found");
    }

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    let result=await customerRemove({
        id_khachhang:id
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

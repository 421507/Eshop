/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-31 15:03:54
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 13:43:47
 */
const db = require("../../models/index");
const Present = db.present;


const getAll=async props =>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;
    if(props.ten !== undefined)
        condition.ten=props.ten;
    if(props.ngay_batdau !== undefined)
        condition.ngay_batdau=props.ngay_batdau;
    if(props.ngay_ketthuc !== undefined)
        condition.ngay_ketthuc=props.ngay_ketthuc;
    if(props.so_luong !== undefined)
        condition.so_luong=props.so_luong;
    if(props.so_tien !== undefined)
        condition.so_tien=props.so_tien;
    if(props.loai !== undefined)
        condition.loai=props.loai;
    
    try {
        const result=await Present.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const update=async props =>{

    const condition={};
    condition.id=props.id;

    const field={};

    if(props.ten !== undefined)
        field.ten=props.ten;
    if(props.ngay_batdau !== undefined)
        field.ngay_batdau=props.ngay_batdau;
    if(props.ngay_ketthuc !== undefined)
        field.ngay_ketthuc=props.ngay_ketthuc;
    if(props.so_luong !== undefined)
        field.so_luong=props.so_luong;
    if(props.so_tien !== undefined)
        field.so_tien=props.so_tien;
    if(props.loai !== undefined)
        field.loai=props.loai;
    
    
    try {
        const result=await Present.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const remove=async props=>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;

    try {
        const present=await getByPk(props.id);
        const{
            remove:customerPresentRemove
        }=require('./khachhang_present');

        let result=await customerPresentRemove({
            id_present:props.id
        });

        if(present.loai === "voucher"){
            
            const{
                remove:voucherRemove
            }=require('./voucher');

            result =await voucherRemove({
                id_present:props.id
            });
        }
        
        result=await Present.destroy({where:condition});

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getByPk=async pk=>{

    try {
        const result=await Present.findByPk(pk);
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const create=async props=>{

    const field={};

    if(props.ten !== undefined)
        field.ten=props.ten;
    if(props.ngay_batdau !== undefined)
        field.ngay_batdau=props.ngay_batdau;
    if(props.ngay_ketthuc !== undefined)
        field.ngay_ketthuc=props.ngay_ketthuc;
    if(props.so_luong !== undefined)
        field.so_luong=props.so_luong;
    if(props.loai !== undefined)
        field.loai=props.loai;

    if(props.loai === 'discount' && props.so_tien !== undefined){
        field.so_tien=props.so_tien;
    }
    else if(props.loai === 'voucher'){
        const vouchers=props.vouchers;
        const idProducts=vouchers.map(item=>item.id);
        const {
            _getAll:productGetAll
        }=require('./sanpham');
        const products=await productGetAll({id_sanpham:idProducts});

        let total=0;

        vouchers.forEach(element => {
            
            function getProduct(id){
                for (let index = 0; index < products.length; index++) {
                    const element = products[index];
                    if(element.id_sanpham === id)
                        return element;
                }
                return null;
            }

            const product=getProduct(parseInt(element.id));

            total+=product.gia_sanpham*parseInt(element.amount);
        });

        field.so_tien=total;
    }

    try {
        let result=await Present.create(field);

        if(props.loai === "voucher"){
            const {
                create:voucherCreate
            }=require('./voucher');
            const _result=await voucherCreate({
                id_present:result.null,
                vouchers:props.vouchers
            });
        }

        if(result !== null){
            const{
                getAll:customerGetAll
            }=require('./khachhang');

            customerGetAll({})
            .then(async customers=>{

                const _customers=[];

                customers.forEach(element => {
                    if(element.email !== undefined && element.email !== null){
                        _customers.push({
                            email:element.email,
                            link:`${process.env.HOST}/present?customer=${element.uuid}&present=${result.null}`
                        });
                    }
                });

                const {
                    transporter
                }=require('../helpers');

                const promiseFunc=[];

                console.log(_customers);

                _customers.forEach(element => {
                    const mailOptions={
                        from:process.env.GMAIL,
                        to:element.email,
                        subject:"Notification: Presents from Eshop",
                        text:`${props.ten}\n Nhanh chóng click vào link sau để nhận được ưu đãi hấp dẫn\n${element.link}`
                    }
                    promiseFunc.push(transporter.sendMail(mailOptions));
                });
                console.log("AAAAAAAAAAAAAAAAAAAAAAA");

                result=await Promise.all(promiseFunc);
            })
            .catch(err=>{
                console.log(err);
            });
        }

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

const getExpirePresent=async props=>{
    
    const ids=props.idPresents;

    const presents=await getAll({id:ids});

    const now=new Date();

    const presentsExpire=[];

    presents.forEach(element => {
        const end=new Date(element.ngay_ketthuc);

        if(now.getTime() > end.getTime()){
            presentsExpire.push(element.id);
        }
    });

    return presentsExpire;
}

const addCustomerPresent=async props=>{
    const id=props.id_present;

    const present=await getByPk(id);

    if(present.so_luong > 0){
        const result=await update({
            id:id,
            so_luong:present.so_luong-1
        });

        return result;
    }

    return null;
}

module.exports={getAll,update,remove,getByPk,create,getExpirePresent,addCustomerPresent};
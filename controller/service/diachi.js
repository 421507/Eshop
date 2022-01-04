/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 15:13:36
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-03 16:39:28
 */
const db = require('../../models/index');
const Diachi=db.diachi;

exports.getByPk=async (pk) =>{


    try {
        const data=await Diachi.findByPk(pk);

        return data;
    } catch (error) {

        console.log(error);
        return null;
        
    }
}

exports.update=async (props)=>{

    if(props.id_diachi === null){

        return await this.create(props);
    }
    const condition={};

    condition.id_diachi=props.id_diachi;

    const field={};

    if(props.sonha !== undefined)
        field.so_nha=props.sonha;
    if(props.street !== undefined)
        field.ten_duong=props.street;
    if(props.ward !== undefined)
        field.phuong=props.ward;
    if(props.district !== undefined)
        field.quan=props.district;
    if(props.city !== undefined)
        field.thanh_pho=props.city;
    if(props.province !== undefined)
        field.tinh=props.province;
    
    try {
        const result=await Diachi.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.create=async (props)=>{

    const field={};

    if(props.sonha !== undefined)
        field.so_nha=props.sonha;
    if(props.street !== undefined)
        field.ten_duong=props.street;
    if(props.ward !== undefined)
        field.phuong=props.ward;
    if(props.district !== undefined)
        field.quan=props.district;
    if(props.city !== undefined)
        field.thanh_pho=props.city;
    if(props.province !== undefined)
        field.tinh=props.province;

    try {
        const result=await Diachi.create(field,{returning:true});
 
        return result;
    } catch (error) {   
        console.log(error);
        return null;
    }
}
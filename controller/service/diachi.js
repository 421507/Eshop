/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 15:13:36
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-16 15:43:37
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

    if(props.sonha)
        field.so_nha=props.sonha;
    if(props.street)
        field.ten_duong=props.street;
    if(props.ward)
        field.phuong=props.ward;
    if(props.district)
        field.quan=props.district;
    if(props.city)
        field.thanh_pho=props.city;
    if(props.province)
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

    if(props.sonha)
        field.so_nha=props.sonha;
    if(props.street)
        field.ten_duong=props.street;
    if(props.ward)
        field.phuong=props.ward;
    if(props.district)
        field.quan=props.district;
    if(props.city)
        field.thanh_pho=props.city;
    if(props.province)
        field.tinh=props.province;

    try {
        const result=await Diachi.create(field);
 
        return result.null;
    } catch (error) {   
        console.log(error);
        return null;
    }
}
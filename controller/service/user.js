/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:08:17
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-16 16:52:50
 */
const db=require("../../models/index");
const User=db.user;
const Op=require("sequelize");

exports.getUser=async (username)=>{

    try {
        const condition={
            username:username
        }
        const data= await User.findAll({where:condition});
    
        if (data.length > 0)
            return data[0];
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.createUser=async (username,password)=>{

    try{
        const user={
            username:username,
            password:password
        }

        const data = await User.create(user);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }

}

exports.update=async (props)=>{

    const condition={};

    condition.id_user=props.id_user;

    const field={};
    // console.log("DIA CHI: ",props.id_diachi);
    if(props.ten)
        field.ten=props.ten;
    if(props.phone)
        field.phone=props.phone;
    if(props.email)
        field.email=props.email;
    if(props.id_diachi !== null)
        field.id_diachi=props.id_diachi;
    
    try {
        const result =await User.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;        
    }
}
/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:08:17
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 22:36:45
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

exports.createUser=async (username,password,email)=>{

    try{
        const user={
            username:username,
            password:password,
            email:email
        }

        const data = await User.create(user);
        return data;
    }catch(error){
        console.log(error);
        return null;
    }

}

exports.createUserAdmin=async (username,password)=>{

    try{
        const user={
            username:username,
            password:password,
            role:'admin'
        }

        const data = await User.create(user);
        return data;
    }catch(error){
        console.log(error);
        return null;
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
    if(props.avatar !== null)
        field.avatar=props.avatar;
    if(props.password !== undefined)
        field.password=props.password;
    
    try {
        const result =await User.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;        
    }
}

exports.getAll=async props=>{

    const condition={};
    condition.role='admin';
    
    try {
        const result=await User.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
exports._getAll=async props=>{

    const condition={};
    
    try {
        const result=await User.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getByPk=async pk=>{
    try {
        const result=await User.findByPk(pk);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.remove=async props=>{

    const id=props.id_user;

    const{
        remove:customerRemove
    }=require('./khachhang');
    const{
        remove:groupUserRemove
    }=require('./group_user');

    await Promise.all([
        customerRemove({id_user:id}),
        groupUserRemove({user_id:id})
    ]);

    const condition={};

    condition.id_user=id;

    try {
        const result=await User.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
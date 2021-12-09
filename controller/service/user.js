/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:08:17
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-08 23:51:01
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
        console.log(data);
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
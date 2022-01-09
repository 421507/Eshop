/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 21:03:14
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 12:59:41
 */
const db=require("../../models/index");
const UserNotActive=db.usernotactive;

exports.getUser=async (username)=>{

    try {
        const condition={
            username:username
        }
        const data= await UserNotActive.findAll({where:condition});
    
        if (data.length > 0)
            return data[0];
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.create=async (props)=>{
    
    const field={};
    field.username=props.username;
    field.password=props.password;
    field.email=props.email;
    if(props.name !== undefined)
        field.name=props.name;
        
    try {
        return await UserNotActive.create(field);
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.remove=async (username)=>{
    const condition={};
    condition.username=username;

    try {
        const result=await UserNotActive.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
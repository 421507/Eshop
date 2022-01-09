/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-07 21:27:23
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 17:54:55
 */
const db = require("../../models/index");
const Group_User=db.group_user;
const Op=require('sequelize');

exports.getAll=async props=>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;
    if(props.user_id !== undefined)
        condition.user_id=props.user_id;
    if(props.group_id !== undefined)
        condition.group_id=props.group_id;

    try {
        const result=await Group_User.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.remove=async props=>{

    const condition={};

    if(props.user_id !== undefined)
        condition.user_id=props.user_id;
    if(props.group_id !== undefined)
        condition.group_id=props.group_id;

    try {
        const result=await Group_User.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.create=async props=>{
    const field={};

    if(props.user_id !== undefined)
        field.user_id=props.user_id;
    if(props.group_id !== undefined)
        field.group_id=props.group_id;

    try {
        const result=await Group_User.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.multiCreate=async props=>{

    try {
        const result=await Group_User.bulkCreate(props);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.isBlocked=async user=>{
    const{
        getGroupBlocked
    }=require('./group');
    
    const group=await getGroupBlocked();
    
    const condition={
        user_id:user,
        group_id:group.id
    }

    try {
        const result= await this.getAll(condition);
        if(result.length > 0){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }

}

exports.hasPermission=async (permission,user)=>{

    const{
        getGroup
    }=require('./group');

    const group=await getGroup(permission);
    
    const condition={
        user_id:user,
        group_id:group.id
    }
    try {
        const result= await this.getAll(condition);
        if(result !== null && result.length > 0){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
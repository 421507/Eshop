/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-07 20:58:54
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 00:32:26
 */
const db = require("../../models/index");
const Group=db.group;
const Op=require('sequelize');

exports.getAll=async props=>{

    const condition={};

    if(props.id !== undefined)
        condition.id=props.id;
    if(props.name !== undefined)
        condition.name=props.name;
    if(props.slug !== undefined)
        condition.slug=props.slug;
    
    try {
        const result=await Group.findAll({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getByPk=async pk=>{
    try {
        const result=await Group.findByPk(pk);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.remove=async pk=>{

    const{
        remove:groupUserRemove
    }=require('./group_user');

    await groupUserRemove({group_id:pk});
    const condition={};
    condition.id=pk;
    try {
        const result=await Group.destroy({where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.create= async props=>{

    const field={};

    if(props.name !== undefined)
        field.name=props.name;
    if(props.slug !== undefined)
        field.slug=props.slug;
    
    try {
        const result=await Group.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.update=async props=>{

    const condition={};
    condition.id=props.id;

    const field={};

    if(props.name !== undefined)
        field.name=props.name;
    if(props.slug !== undefined)
        field.slug=props.slug;

    try {
        const result=await Group.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.getGroupBlocked=async  ()=>{

    const condition={slug:'blockedlist'};

    try {
        const result= await this.getAll(condition);
        if(result.length > 0){
            return result[0];
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
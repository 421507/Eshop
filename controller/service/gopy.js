/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 07:37:35
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-09 14:46:52
 */
const db = require('../../models/index');
const Gopy=db.gopy;

exports.getAll=async props=>{

    const condition={};

    if(props.reply !== undefined)
        condition.reply=props.reply;
        
    try {
        const result=await Gopy.findAll(
            {
                where:condition,
                order:[
                    ['create_at','DESC']
                ]
            });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.getByPk=async pk=>{
    try {
        const result=await Gopy.findByPk(pk);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.update=async pk=>{

    const condition={};
    condition.id=pk

    const field={};
    field.reply=true;

    try {
        const result=await Gopy.update(field,{where:condition});
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.create=async props=>{

    const field={
        name:props.name,
        email:props.email,
        subject:props.subject,
        message:props.message,
    };

    try {
        return await Gopy.create(field);
        
    } catch (error) {
        console.log(error);
        return null;
    }

}
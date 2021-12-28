/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-27 23:22:26
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-29 01:09:53
 */
const async = require("hbs/lib/async");
const db = require("../../models/index");
const Review = db.review;

exports.getAll=async (props) =>{

    const condition={};

    if(props.idreview !== undefined){
        condition.idreview=props.idreview;
    }
    if(props.email !== undefined){
        condition.email=props.email;
    }
    if(props.name !== undefined){
        condition.name=props.name;
    }
    if(props.created_at !== undefined){
        condition.created_at=props.created_at;
    }
    if(props.id_sanpham !== undefined){
        condition.id_sanpham=props.id_sanpham;
    }
    if(props.description !== undefined){
        condition.description=props.description;
    }
    if(props.rating !== undefined){
        condition.rating=props.rating;
    }

    try {
        const result=await Review.findAll({
            where:condition,
            order:[
                ['created_at','DESC']
            ]
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.getByPk=async (id) =>{

    try {
        const result=await Review.findByPk(id);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}

exports.create=async (props) =>{

    const field={};

    if(props.email !== undefined){
        field.email=props.email;
    }
    if(props.name !== undefined){
        field.name=props.name;
    }
    if(props.id_sanpham !== undefined){
        field.id_sanpham=props.id_sanpham;
    }
    if(props.description !== undefined){
        field.description=props.description;
    }
    if(props.rating !== undefined){
        field.rating=props.rating;
    }

    try {
        const result = await Review.create(field);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}
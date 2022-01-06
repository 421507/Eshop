/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 14:09:24
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 17:02:53
 */
const {
    remove:brandRemove,
    create:brandCreate
}=require('../service/thuonghieu');

exports.remove= async (req,res) =>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");
    
    const result=await brandRemove({id_thuonghieu:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.renderPage=async (req,res)=>{

    return res.render('admin/add-brand',{
        auth:true,
        layout:'admin'
    });

}

exports.create=async (req,res)=>{

    const name=req.body.name;

    const result=await brandCreate({ten_thuonghieu:name});

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
    return res.status(200).send("OK");
}
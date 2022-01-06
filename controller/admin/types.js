/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 14:09:24
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 17:12:32
 */
 const {
    remove:typeRemove,
    create:typeCreate
}=require('../service/loaisanpham');

exports.remove= async (req,res) =>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");
    
    const result=await typeRemove({id_loaisp:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.create=async (req,res)=>{

    const name=req.body.name;

    const result=await typeCreate({ten_loaisp:name});

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
    return res.status(200).send("OK");
}

exports.renderPage=async (req,res)=>{

    return res.render('admin/add-type',{
        auth:true,
        layout:'admin'
    });

}
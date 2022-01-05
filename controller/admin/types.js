/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 14:09:24
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-05 14:44:40
 */
 const {
    remove:typeRemove
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
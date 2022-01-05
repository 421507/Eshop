/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 14:09:24
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-05 14:30:33
 */
const {
    remove:brandRemove
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
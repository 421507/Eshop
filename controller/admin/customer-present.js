/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 13:53:59
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 13:55:59
 */
const{
    remove:customerPresentRemove
}=require('../service/khachhang_present');

exports.remove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null){
        return res.status(401).send("ID not found");
    }

    if(parseInt(id) < 1)
        return res.status(401).send("ID invalid");

    let result=await customerPresentRemove({
        id:id
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}
/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 14:09:24
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 09:52:29
 */
 const {
    remove:typeRemove,
    create:typeCreate,
    update:typeUpdate,
    getByPk:typeGetByPk
}=require('../service/loaisanpham');

exports.remove= async (req,res) =>{

    const id=req.params.id;

    if(id === undefined || id === null)
        return res.status(401).send("ID not found");

    try {
        const result=await typeRemove({id_loaisp:id});
        if(result === null){
            console.log("AAAAAAAAAAAAAAAAAAaa");            
            return res.status(401).send("Something wrong please try again");
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send("Something wrong please try again");
    }
    
        

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

exports.renderDetail=async(req,res)=>{

    const id=req.query.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.redirect('/admin');
    }

    const type=await typeGetByPk(id);

    if(type === null)
        return res.redirect('/admin');

    const payload={
        id:type.id_loaisp,
        name:type.ten_loaisp,
    }

    return res.render('admin/type-detail',{
        layout:'admin',
        auth:true,
        data:payload
    });
}

exports.update=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const type=await typeGetByPk(id);

    if(type === null)
        return res.status(401).send("ID invalid");

    const name=req.body.name;

    let result=await typeUpdate({
        id_loaisp:id,
        ten_loaisp:name
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}
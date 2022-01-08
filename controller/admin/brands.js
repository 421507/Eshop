/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-05 14:09:24
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 10:14:17
 */
const {
    remove:brandRemove,
    create:brandCreate,
    getByPk:brandGetByPk,
    update:brandUpdate
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

exports.renderDetail=async(req,res)=>{

    const id=req.query.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.redirect('/admin');
    }

    const brand=await brandGetByPk(id);

    if(brand === null)
        return res.redirect('/admin');

    const payload={
        id:brand.id_thuonghieu,
        name:brand.ten_thuonghieu,
        number:brand.so_sanpham
    }

    return res.render('admin/brand-detail',{
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

    const brand=await brandGetByPk(id);

    if(brand === null)
        return res.status(401).send("ID invalid");

    const name=req.body.name;

    let result=await brandUpdate({
        id_thuonghieu:id,
        ten_thuonghieu:name
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}


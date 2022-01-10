/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 08:03:13
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:03:21
 */
const{
    getByPk:notiGetByPk,
    update:notiUpdate
}=require('../service/gopy');
const{
    transporter
}=require('../helpers');

exports.render=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.redirect('/admin');
    }

    const noti=await notiGetByPk(id);
    
    if(noti === null)
        return res.redirect('/admin');

    const payload={
        name:noti.name,
        email:noti.email,
        subject:noti.subject,
        message:noti.message,
        date:new Date(noti.create_at).toLocaleString(),
        id:id
    }

    return res.render('admin/notification',{
        layout:'admin',
        auth:true,
        data:payload
    });

}

exports.renderReply=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.redirect('/admin');
    }

    const noti=await notiGetByPk(id);
    
    if(noti === null)
        return res.redirect('/admin');

    const payload={
        email:noti.email,
        id:noti.id
    }

    return res.render('admin/reply',{
        layout:'admin',
        auth:true,
        data:payload
    })
}

exports.reply=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const noti=await notiGetByPk(id);

    if(noti === null)
        return res.status(401).send("ID Invalid");

    await notiUpdate(id);

    const subject=req.body.subject;
    const message=req.body.message;

    const mailOptions={
        from:process.env.GMAIL,
        to:noti.email,
        subject:subject,
        text:`${message} \nBest regards,\nEshop Admin`
    }

    transporter.sendMail(mailOptions);

    return res.status(200).send("OK");
}
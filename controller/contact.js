/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-09 14:13:29
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:25:14
 */
const{
    create:gopYCreate
}=require('./service/gopy');

const {
    isAuth,
    getUser
}=require('./service/auth');

exports.add=async (req,res)=>{

    const name=req.body.name;
    const email=req.body.email;
    const subject=req.body.subject;
    const message=req.body.message;

    let result=await gopYCreate({
        name:name,
        email:email,
        subject:subject,
        message:message
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    return res.status(200).send("OK");
}

exports.render=async (req,res)=>{

    const auth=await isAuth(req);
    let name="";
    let email="";
    
    if(auth){
        const user=await getUser(req);

        name=user.ten;
        email=user.email;
    }

    return res.render('contact',{
        auth:auth,
        data:{
            name:name,
            email:email
        },
        brands:req.brands,
        types:req.types
    });
}
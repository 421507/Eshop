/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:05:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 22:41:34
 */
const {getUser,createUser,update : userUpdate} = require('./service/user');
const {
    getUser:userNotActiveGetUser,
    create:userNotActiveCreate,
    remove:userNotActiveRemove
} = require('./service/usernotactive');
const bcrypt  =require('bcrypt');
const {generateToken}=require('./service/token');
const {update : addressUpdate}=require('./service/diachi');
const {
    create:customerCreate,
    getAll:customerGetAll,
}=require('./service/khachhang');
const{
    getAll:cityGetAll
}=require('./service/thanhpho');
const{
    transporter
}=require('./helpers/index');

const { v4: uuidv4 } = require('uuid');
exports.register=async(req,res)=>{

    const username = req.body.username;
    const email=req.body.email;

    const user = await getUser(username);
    
    if(user !== null)
        res.status(409).send("Tài khoản đã tồn tại");
    
    else{

        const _user=await userNotActiveGetUser(username);
        
        if(_user !== null)
            res.status(409).send("Tài khoản đã tồn tại");
        
        const saltRounds = 10;
        try {
            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                
                if(err){
                    console.log(err);
                }
                else{

                    const userNotActive=await userNotActiveCreate(username,hash,email);
                    if (!userNotActive) {
                        return res
                            .status(401)
                            .send('Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại');
                    }

                    const mailOption={
                        from:process.env.GMAIL,
                        to:email,
                        subject:"Link kích hoạt",
                        text:`http://localhost:3000/active?username=${username}`
                    }
    
                    transporter.sendMail(mailOption);
    
                    return res.status(200).send('Hãy kiểm tra gmail của bạn');

                    
                    // const newUser = await createUser(username,hash);

                    // if (!newUser) {
                    //     return res
                    //         .status(401)
                    //         .send('Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại');
                    // }

                    // const uuid=uuidv4();

                    // const result=await customerCreate({uuid:uuid,id_user:newUser.null});

                    // return res.status(200).send('Đăng kí thành công');
                    
                }
            });
        
        } catch (error) {
            console.log(error);
        }
    }
    
}

exports.login = async(req,res)=>{

    const username = req.body.username || null;
	const password = req.body.password || null;

    const user = await getUser(username);
    console.log(username);
    console.log(password);
    if (!user) {
        const _user=await userNotActiveGetUser(username);

        if(_user)
            return res.status(401).send('Tài khoản của bạn chưa được kích hoạt.');
        else{
            return res.status(401).send('Tài khoản không tồn tại');
        }
    }

    try {
        const result = await bcrypt.compare(password, user.password);

        if(!result){
            return res.status(401).send('Mật khẩu không chính xác.');
        }
        else{
            const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

            const dataForAccessToken = {
                username: user.username,
            };
            const accessToken = await generateToken(
                dataForAccessToken,
                accessTokenSecret,
                accessTokenLife,
            );

            if (!accessToken) {
                return res
                    .status(401)
                    .send('Đăng nhập không thành công, vui lòng thử lại.');
            }

            const customer=await customerGetAll({id_user:user.id_user});

            const option={
                maxAge:1000*60*60*24*365,
                httpOnly:true
            }
            res.cookie('uuid',customer[0].uuid,option);
            res.cookie('auth',accessToken);
            return res.status(200).send("OK");

        }
    } catch (error) {
        console.log(error);
    }

    
}

exports.logout=async(req,res)=>{

    res.cookie('auth','');
    res.cookie('uuid','');

    return res.redirect('/');

}

exports.renderProfilePage=async(req,res)=>{

    const diachi=require('./service/diachi');

    const data=await diachi.getByPk(req.user.id_diachi);

    let address={
        so_nha:'',
        ten_duong:'',
        phuong:'',
        quan:'',
        thanh_pho:'',
        tinh:''
    }

    let user={
        phone:'',
        email:'',
        name:''
    }

    if(req.user.email !== undefined && req.user.email !== null)
        user.email=req.user.email;
    if(req.user.phone !== undefined && req.user.phone !== null)
        user.phone=req.user.phone;
    if(req.user.ten !== undefined && req.user.ten !== null)
        user.name=req.user.ten;

    const cities=await cityGetAll({});

    let _cities=cities.map(item=>{

        return {
            id:item.id,
            ten_thanhpho:item.ten_thanhpho,
            zipcode:item.zipcode,
            gia_ship:item.gia_ship,
            slug:item.slug,
            selected:false
        }
    });

    if(data !== null){
        if(data.thanh_pho !== undefined && data.thanh_pho !== null){

            _cities.forEach((item,index)=>{
    
                if(item.slug === data.thanh_pho)
                    _cities[index].selected=true;                
            });
        }
    
        if(data.so_nha !== undefined && data.so_nha !== null)
            address.so_nha=data.so_nha;
                
        if(data.ten_duong !== undefined && data.ten_duong !== null)
            address.ten_duong=data.ten_duong;
        
        if(data.phuong !== undefined && data.phuong !== null)
            address.phuong=data.phuong;
            
        if(data.quan !== undefined && data.quan !== null)
            address.quan=data.quan;
    
        if(data.tinh !== undefined && data.tinh !== null)
            address.tinh=data.tinh;
    }

    return res.render('profile',{
        address:address,
        user:user,
        cities:_cities,
        auth:true
    })

}

exports.update=async (req,res)=>{
    // console.log(req.user);
    const {
        sonha,
        street,
        ward,
        district,
        city,
        province,
        email,
        name,
        phone
    }=req.body;

    const _city=await cityGetAll({id:city});

    try {
        const id_diachi=await addressUpdate({
                id_diachi:req.user.id_diachi,
                sonha:sonha,
                street:street,
                ward:ward,
                district:district,
                city:_city[0].slug,
                province:province
            });
        // console.log("AAAAAAAAA ",id_diachi);
        const result = await userUpdate({
            id_user:req.user.id_user,
            email:email,
            ten:name,
            phone:phone,
            id_diachi: req.user.id_diachi !== null ? null:id_diachi
        });
        return res.status(200).send('Update thành công');
    } catch (error) {
        console.log(error);
        return res.status(401).send('Update không thành công,vui lòng thử lại');
    }

}

exports.handleForgetPass=async (req,res)=>{

    const username=req.body.username;

    
    const user = await getUser(username);

    if(user === null)
        res.status(409).send("Tài khoản không tồn tại");

    const saltRounds = 10;
    try {
        bcrypt.hash("123456789", saltRounds, async (err, hash) => {
            
            if(err){
                console.log(err);
            }
            else{
                let result = await userUpdate({
                    id_user:user.id_user,
                    password:hash
                });

                if (!result) {
                    return res
                        .status(401)
                        .send('Có lỗi xảy ra, xin vui lòng thử lại');
                }

                const mailOption={
                    from:process.env.GMAIL,
                    to:user.email,
                    subject:"Reset password",
                    text:"Password của bạn hiện tại là 123456789"
                }

                transporter.sendMail(mailOption);

                return res.status(200).send('Hãy kiểm tra gmail của bạn');
                
            }
        });
    
    } catch (error) {
        console.log(error);
    }
}

exports.handleChangePass=async (req,res)=>{

    console.log(req.body);

    const oldpass=req.body.oldpass;
    const newpass=req.body.newpass;

    const user=req.user;
    try {
        const result = await bcrypt.compare(oldpass, user.password);

        if(!result){
            return res.status(401).send('Mật khẩu không chính xác.');
        }
        else{
            
            const saltRounds = 10;
            bcrypt.hash(newpass, saltRounds, async (err, hash) => {
                    
                if(err){
                    console.log(err);
                }
                else{
                    let result = await userUpdate({
                        id_user:user.id_user,
                        password:hash
                    });

                    if (!result) {
                        return res
                            .status(401)
                            .send('Có lỗi xảy ra, xin vui lòng thử lại');
                    }

                    return res.status(200).send('Thành công');
                    
                }
            });

        }
    } catch (error) {
        console.log(error);
    }    
}

exports.activeUser=async(req,res)=>{
    const username=req.query.username;

    if(username === undefined || username === null)
        return res.render('active',{
            message:'Link không hợp lệ',
            auth:false
        });

    const user=await userNotActiveGetUser(username);
    if(user === null){
        return res.render('active',{
            message:'Username không hợp lệ',
            auth:false
        });
    }

    const newUser = await createUser(username,user.password,user.email);

    if (!newUser) {
        return res.render('active',{message:'Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại',auth:false});
    }

    const uuid=uuidv4();

    const result=await customerCreate({uuid:uuid,id_user:newUser.null});

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
        username: username,
    };
    const accessToken = await generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );

    if (!accessToken) {
        return res.render('active',{message:'Đăng nhập không thành công, vui lòng thử lại',auth:false});
    }

    userNotActiveRemove(username);

    const option={
        maxAge:1000*60*60*24*365,
        httpOnly:true
    }
    res.cookie('uuid',uuid,option);
    res.cookie('auth',accessToken);

    return res.render('active',{
        message:"Tài khoản của bạn đã được kích hoạt",
        auth:true
    });
}

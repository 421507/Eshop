/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-08 23:05:58
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-22 01:04:56
 */
const {getUser,createUser,update : userUpdate} = require('./service/user');
const bcrypt  =require('bcrypt');
const {generateToken}=require('./service/token');
const {update : addressUpdate}=require('./service/diachi');

exports.register=async(req,res)=>{

    console.log(req.body);
    const username = req.body.username;

    const user = await getUser(username);
    
    if(user !== null)
        res.status(409).send("Tài khoản đã tồn tại");
        // return res.redirect('/login');
    else{
        const saltRounds = 10;
        try {
            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                
                if(err){
                    console.log(err);
                }
                else{
                    const newUser = await createUser(username,hash);

                    if (!newUser) {
                        return res
                            .status(401)
                            .send('Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại');
                        // return res.redirect('/login');
                    }
                    return res.status(200).send('Đăng kí thành công');
                    // const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                    // const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

                    // const dataForAccessToken = {
                    //     username: req.body.username,
                    // };


                    // try {
                    //     const accessToken = await generateToken(
                    //         dataForAccessToken,
                    //         accessTokenSecret,
                    //         accessTokenLife,
                    //     );

                    //     if (!accessToken) {
                    //         return res
                    //             .status(401)
                    //             .send('Đăng kí không thành công, vui lòng thử lại.');
                    //     }
                    //     res.cookie('auth',accessToken);

                    //     return res.redirect('/');
                    // } catch (error) {
                        
                    //     console.log(error);
                    // }
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
    
		return res.status(401).send('Tên đăng nhập không tồn tại.');
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
            res.cookie('auth',accessToken);
            return res.status(200).send("OK");

        }
    } catch (error) {
        console.log(error);
    }

    
}

exports.logout=async(req,res)=>{

    res.cookie('auth','');

    return res.redirect('/');

}

exports.renderProfilePage=async(req,res)=>{

    const diachi=require('./service/diachi');

    const data=await diachi.getByPk(req.user.id_diachi);

    if(!data){

        res.render('profile',
        {
            auth:true,
            user:req.user,
            diachi:{
                so_nha:'',
                ten_duong:'',
                phuong:'',
                quan:'',
                thanh_pho:'',
                tinh:''
            }
        })
    }
    else{
        console.log(data.ten_duong);
        res.render('profile',
        {
            auth:true,
            user:req.user,
            diachi:data
        })
    }


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

    try {
        const id_diachi=await addressUpdate({
                id_diachi:req.user.id_diachi,
                sonha:sonha,
                street:street,
                ward:ward,
                district:district,
                city:city,
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
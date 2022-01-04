/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 01:28:57
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 02:20:56
 */
const {
    getUser:userGetUser,
    createUser:userCreateUser
} = require('../service/user');

const bcrypt  =require('bcrypt');

const {generateToken}=require('../service/token');

exports.login = async(req,res)=>{

    const username = req.body.username || null;
	const password = req.body.password || null;

    const user = await userGetUser(username);

    if (!user) {
		return res.status(401).send("Username không tồn tại");
	}

    const result =await bcrypt.compare(password, user.password);

    if(!result){
        return res.status(401).send("Mật khẩu không chính xác");
    }

    if(user.role !== 'admin')
        return res.status(401).send("Bạn không được quyền vào trang này");

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
		username: user.username,
	};

    try {
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
    } catch (error) {
        
        console.log(error);
        return res.status(401).send("Something wrong please try again");
    }
}

exports.logout=async(req,res)=>{

    res.cookie('auth','');
    console.log("AAAAAAAAAAAAAAAAaaaaa");
    return res.redirect('/admin');
}
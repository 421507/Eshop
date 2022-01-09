/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:41:01
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 05:27:45
 */
const {getUser,createUser} = require('./service/user');
const bcrypt  =require('bcrypt');
const {generateToken}=require('./service/token');
exports.renderLoginPage=async(req,res)=>{

    const {isAuth}=require('./service/auth');

    try {
        const isauth=await isAuth(req);

        if(isauth){
            res.redirect('/');
        }
        else{
            res.render('login',{
                brands:req.brands,
                types:req.types
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.login=async (req,res)=>{

    const username = req.body.username || null;
	const password = req.body.password || null;

    const user = await getUser(username);
    console.log(username);
    console.log(password);
    if (!user) {
		return res.redirect('/login');
	}

    try {
        const result = await bcrypt.compare(password, user.password);

        if(!result){
            return res.redirect('/login');
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

            return res.redirect('/');

        }
    } catch (error) {
        console.log(error);
    }
}

exports.register=async (req,res)=>{

    const username = req.body.username;

    const user = await getUser(username);
    
    if(user !== null)
        // res.status(409).send({
        //     errorCode:1,
        //     message:"Tài khoản đã tồn tại"
        // });
        return res.redirect('/login');
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
                        // return res
                        //     .status(200)
                        //     .send({
                        //         errorCode:-1,
                        //         message:'Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại'
                        //     });
                        return res.redirect('/login');
                    }
                    // return res.send({
                    //     errorCode:0,
                    //     message:'Đăng kí thành công'
                    // });
                    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

                    const dataForAccessToken = {
                        username: req.body.username,
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
                                .send('Đăng kí không thành công, vui lòng thử lại.');
                        }
                        res.cookie('auth',accessToken);

                        return res.redirect('/');
                    } catch (error) {
                        
                        console.log(error);
                    }
                }
            });
        
        } catch (error) {
            console.log(error);
        }

        
    }
}
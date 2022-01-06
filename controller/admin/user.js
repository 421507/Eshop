/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 01:28:57
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-06 21:49:44
 */
const {
    getUser:userGetUser,
    createUser:userCreateUser
} = require('../service/user');
const{
    getByPk:addressGetByPk
}=require('../service/diachi');
const{
    getAll:cityGetAll,
}=require('../service/thanhpho');


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
    return res.redirect('/admin');
}

exports.renderProfilePage=async (req,res)=>{

    const user=req.user;
    
    let address=null;
    
    if(user.id_diachi !== null && user.id_diachi !== undefined)
        address=await addressGetByPk(user.id_diachi);

    const _cities=await cityGetAll({}); 

    const cities=_cities.map(item=>{

        return {
            id:item.id,
            name:item.ten_thanhpho,
            selected:false
        }
    });

    const payload={
        name:user.ten,
        email:user.email,
        phone:user.phone,
        numHouse:"",
        street:"",
        ward:"",
        district:"",
        cities:cities,
        province:""
    }
    
    if (address !== null){
        
        payload.numHouse=address.so_nha !== undefined && address.so_nha !== null ? address.so_nha : "";
        payload.street=address.ten_duong !== undefined && address.ten_duong !== null ? address.ten_duong : "";
        payload.ward=address.phuong !== undefined && address.phuong !== null ? address.phuong : "";
        payload.district=address.quan !== undefined && address.quan !== null ? address.quan : "";
        payload.province=address.tinh !== undefined && address.tinh !== null ? address.tinh : "";
        
        if(address.thanh_pho !== undefined && address.thanh_pho !== null){

            for (let index = 0; index < cities.length; index++) {
                const element = cities[index];

                if(element.slug === address.thanh_pho){
                    cities[index].selected=true;
                    break;
                }                
            }
        }
    }
    
    return res.render('admin/profile',{
        layout:'admin',
        auth:true,
        data:payload
        
    });

}
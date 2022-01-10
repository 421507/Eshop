/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-04 01:28:57
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-10 04:36:41
 */
const {
    getUser:userGetUser,
    createUserAdmin:userCreateUser,
    getAll:userGetAll,
    getByPk:userGetByPk,
    update:userUpdate,
    remove:userRemove
} = require('../service/user');
const{
    getByPk:addressGetByPk
}=require('../service/diachi');
const{
    getAll:cityGetAll,
}=require('../service/thanhpho');
const{
    getAll:groupGetAll,
    getByPk:groupGetByPk,
    remove:groupRemove,
    create:groupCreate,
    update:groupUpdate
}=require('../service/group');
const{
    getAll:groupUserGetAll,
    remove:groupUserRemove,
    multiCreate:groupUserMuliCreate
}=require('../service/group_user');
const{
    getByPk:cityGetByPk
}=require('../service/thanhpho');
const{
    create:addressCreate,
    update:addressUpdate
}=require('../service/diachi');
const {
    create:customerCreate,
}=require('../service/khachhang');
const{
    transporter
}=require('../helpers/index');
const{
    isBlocked
}=require('../service/group_user');
const{
    getGroupBlocked
}=require('../service/group');
const{
    getUser:userNotActiveGetUser,
    create:userNotActiveCreate,
    remove:userNotActiveRemove
}=require('../service/usernotactive');

const bcrypt  =require('bcrypt');

const {generateToken}=require('../service/token');
const { v4: uuidv4 } = require('uuid');

exports.login = async(req,res)=>{

    const username = req.body.username || null;
	const password = req.body.password || null;

    const user = await userGetUser(username);

    if (!user) {

        const _user =await userNotActiveGetUser(username);
        if(!_user)
            return res.status(401).send("Username không tồn tại");
        else
        return res.status(401).send("Tài khoản chưa được kích hoạt");
    }

    const block=await isBlocked(user.id_user);

    if(block)
        return res.status(401).send("Bạn đã bị chặn");

    const result =await bcrypt.compare(password, user.password);

    if(!result){
        return res.status(401).send("Mật khẩu không chính xác");
    }

    if(user.role === null || user.role === undefined || user.role !== 'admin')
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

exports.register=async (req,res)=>{
    
    const username = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    
    const user = await userGetUser(username);
    
    
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
                    const userNotActive=await userNotActiveCreate({
                        username:username,
                        password:hash,
                        email:email,
                        name:name
                    });

                    if (userNotActive === null) {
                        return res
                            .status(401)
                            .send('Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại');
                    }

                    const mailOption={
                        from:process.env.GMAIL,
                        to:email,
                        subject:"Link kích hoạt",
                        text:`http://localhost:3000/admin/active?username=${username}`
                    }
    
                    transporter.sendMail(mailOption);
    
                    return res.status(200).send('Link kích hoạt đã được gửi vào mail');


                    // const uuid=uuidv4();

                    // const result=await customerCreate({uuid:uuid,id_user:newUser.null});

                    // return res.status(200).send({
                    //     id:newUser.null
                    // });
                    
                }
            });
        
        } catch (error) {
            console.log(error);
        }
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
            slug:item.slug,
            selected:false
        }
    });

    const payload={
        id:user.id_user,
        name:user.ten,
        email:user.email,
        phone:user.phone,
        avatar:user.avatar,
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

exports.renderListing=async (req,res)=>{

    const _users=await userGetAll({});

    const users=_users.map(element=>{

        return {
            name:element.ten,
            username:element.username,
            email:element.email,
            role:element.role,
            id:element.id_user
        }
    });

    const _groups=await groupGetAll({});

    const groups=_groups.map(element=>{

        return{
            id:element.id,
            name:element.name,
            slug:element.slug
        }
    });

    const payload={
        users:users,
        groups:groups,
    }

    return res.render('admin/accounts',{
        auth:true,
        layout:'admin',
        data:payload
    });
}

exports.renderAccountDetail=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.redirect('/admin');
    }

    const user=await userGetByPk(id);
    
    if(user === null)
        return res.redirect('/admin');

    let address=null;

    if(user.id_diachi !== null && user.id_diachi !== undefined)
        address=await addressGetByPk(user.id_diachi);

    const _cities=await cityGetAll({}); 

    const cities=_cities.map(item=>{

        return {
            id:item.id,
            name:item.ten_thanhpho,
            slug:item.slug,
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
        province:"",
        id:user.id_user
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

    const groupUser=await groupUserGetAll({user_id:id});

    const _groups=await groupGetAll({});

    const groups=_groups.map(element=>{

        return{
            id:element.id,
            name:element.name
        }
    });

    const selectGroups=[];
    const unselectGroups=[];

    groups.forEach(element=>{

        function check(id) {
            for (let index = 0; index < groupUser.length; index++) {
                const element = groupUser[index];
                if(element.group_id === id)
                    return true;
                
            }
            return false;
        }

        if(!check(element.id)){
            unselectGroups.push(element);
        }
        else
            selectGroups.push(element);
    });

    if(parseInt(id) === req.user.id_user){
        
        const groupBlock=await getGroupBlocked();

        function check(groups){
            for (let index = 0; index < groups.length; index++) {
                const element = groups[index];
                if(element.id === groupBlock.id)
                    return index;
            }
            return -1;
        }

        let index=check(unselectGroups);
        if(index > -1){
            unselectGroups.splice(index,1);
        }
        index=check(selectGroups);
        if(index > -1){
            selectGroups.splice(index,1);
        }
    }

    payload.selectGroups=selectGroups;
    payload.nonSelectGroups=unselectGroups;
    
    return res.render('admin/account-detail',{
        layout:'admin',
        auth:true,
        data:payload
        
    });
}

exports.renderGroupDetail=async (req,res)=>{

    const id=req.query.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.redirect('/admin');
    }

    const groupBlock=await getGroupBlocked();

    const group=await groupGetByPk(id);
    
    if(group === null)
        return res.redirect('/admin');

    const groupuser=await groupUserGetAll({group_id:id});

    const _users=await userGetAll({});

    const users=_users.map(element=>{

        return {
            name:element.ten,
            username:element.username,
            email:element.email,
            role:element.role,
            id:element.id_user
        }
    });

    const unselectUsers=[];
    const selectUsers=[];

    users.forEach(element => {
        
        function check(id) {
            for (let index = 0; index < groupuser.length; index++) {
                const element = groupuser[index];
                if(element.user_id === id)
                    return true;
            }
            return false;
        }

        if(!check(element.id)){
            unselectUsers.push({
                id:element.id,
                username:element.username
            });
        }
        else{
            selectUsers.push({
                id:element.id,
                username:element.username
            });
        }
    });
    if(groupBlock.id === parseInt(id)){
        function findUser(users){
            for (let index = 0; index < users.length; index++) {
                const element = users[index];
                if(element.id === req.user.id_user)
                    return index;
            }
            return -1;
        }
        let index=findUser(unselectUsers);
        if(index > -1)
            unselectUsers.splice(index,1);

        index=findUser(selectUsers);
        if(index > -1)
            selectUsers.splice(index,1);
    }

    const payload={
        name:group.name,
        id:group.id,
        slug:group.slug,
        nonSelectUsers:unselectUsers,
        selectUsers:selectUsers,
    }

    return res.render('admin/group-detail',{
        auth:true,
        layout:'admin',
        data:payload
    });
}

exports.update=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const user=await userGetByPk(id);

    if(user === null)
        return res.status(401).send("ID invalid");
    
    const{
        name,
        email,
        phone,
        numHouse,
        street,
        ward,
        district,
        idCity,
        province,
    }=req.body;


    const city=await cityGetByPk(idCity);

    if(city === null)
        return res.status(401).send("City invalid");

    if(user.id_diachi === null || user.id_diachi === undefined){
        const address = await addressCreate({
            sonha:numHouse,
            street:street,
            ward:ward,
            district:district,
            city:city.slug,
            province:province
        });

        const result =await userUpdate({
            id_user:id,
            id_diachi:address.null,
            ten:name,
            email:email,
            phone:phone
        });

        if (result === null)
            return res.status(401).send("Something wrong please try again");
    }
    else{
        
        const result=await Promise.all([
            addressUpdate({
                id_diachi:user.id_diachi,
                sonha:numHouse,
                street:street,
                ward:ward,
                district:district,
                city:city.slug,
                province:province
            }),
            userUpdate({
                id_user:id,
                ten:name,
                email:email,
                phone:phone
            })
        ]);

        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if(element === null)
                return res.status(401).send("Something wrong please try again");
        }
    }

    return res.status(200).send("OK");
}

exports.updatePermission=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const user=await userGetByPk(id);

    if(user === null)
        return res.status(401).send("ID invalid");

    const idGroups=req.body.idGroups === undefined || req.body.idGroups === null || req.body.idGroups === '' ? []:req.body.idGroups;

    await groupUserRemove({
        user_id:id
    });


    if(idGroups.length > 0){

        const data=idGroups.map(item=>{
            return{
                user_id:id,
                group_id:item
            }
        });

        const result=await groupUserMuliCreate(data);     

        if(result === null)
            return res.status(401).send("Something wrong please try again");
    }

    return res.status(200).send("OK");
}

exports.renderAdd=async (req,res)=>{

    // const _groups=await groupGetAll({});

    // const groups=_groups.map(item=>{
    //     return{
    //         id:item.id,
    //         name:item.name,
    //         slug:item.slug
    //     }
    // });

    // const payload={
    //     groups:groups
    // }
    const payload={};

    res.render('admin/add-account',{
        layout:'admin',
        auth:true,
        data:payload
    });

}

exports.remove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const user=await userGetByPk(id);

    if(user === null)
        return res.status(401).send("ID invalid");

    if(req.user.id_user === user.id_user)
        return res.status(401).send("Can not delete yourself");

    let result=await userRemove({id_user:id});

    if(result === null)
        return res.status(401).send("Something wrong please try again");
    return res.status(200).send("OK");
}

exports.groupRemove=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const group=await groupGetByPk(id);

    if(group === null)
        return res.status(401).send("ID invalid");

    let result=await groupRemove(id);
    
    if(result === null)
        return res.status(401).send("Something wrong please try again");
    
    return res.status(200).send("OK");
}

exports.renderGroupAdd=async (req,res)=>{

    const _users=await userGetAll({});

    const users=_users.map(item=>{
        return{
            id:item.id_user,
            username:item.username
        }
    });

    const payload={
        users:users
    }

    return res.render('admin/add-group',{
        layout:'admin',
        auth:true,
        data:payload
    })

}

exports.createGroup=async (req,res)=>{

    const name=req.body.name;
    const slug=req.body.slug;

    const idUsers=req.body.idUsers === "" ? [] : req.body.idUsers;

    const groups=await groupGetAll({slug:slug});

    if(groups.length > 0){
        return res.status(401).send("Group này đã tồn tại");
    }

    let result=await groupCreate({
        name:name,
        slug:slug
    });
    
    if(result === null)
        return res.status(401).send("Something wrong please try again");

    if(idUsers.length > 0){

        const data=idUsers.map(item=>{
            return{
                group_id:result.null,
                user_id:item
            }
        });

        result=await groupUserMuliCreate(data);

        if(result === null)
            return res.status(401).send("Something wrong please try again");
    }

    return res.status(200).send("OK")
}

exports.updateGroup=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const group=await groupGetByPk(id);

    if(group === null)
        return res.status(401).send("ID invalid");

    const name=req.body.name;
    const slug=req.body.slug;
    const idUsers=req.body.idUsers === "" ? [] : req.body.idUsers;
    
    const groups=await groupGetAll({slug:slug});

    const payload={
        id:id,
        name:name
    }
    
    if(groups.length === 0){
        payload.slug=slug;
    }

    let result=await groupUpdate(payload);

    if(result === null)
        return res.status(401).send("Something wrong please try again");

    await groupUserRemove({
        group_id:id
    });

    if(idUsers.length > 0){

        const data=idUsers.map(item=>{
            return{
                group_id:id,
                user_id:item
            }
        });

        let result=await groupUserMuliCreate(data);

        if(result === null)
            return res.status(401).send("Something wrong please try again");
    }

    return res.status(200).send("OK");

}

exports.upload=async (req,res)=>{

    const id=req.params.id;

    if(id === undefined || id === null || parseInt(id) < 1){
        return res.status(401).send("ID not found");
    }

    const user=await userGetByPk(id);

    if(user === null)
        return res.status(401).send("ID invalid");

    const file = req.file
    if (!file) {
        return res.status(401).send("Please upload a file");
    }

    let result=await userUpdate({
        avatar:`/images/${file.filename}`,
        id_user:id
    });

    if(result === null)
        return res.status(401).send("Something wrong please try again"); 
    console.log(file);
    res.status(200).send(file);

}

exports.forgetPass=async (req,res)=>{

    const username=req.body.username;

    const user = await userGetUser(username);

    if (!user) {
		return res.status(401).send("Username không tồn tại");
	}

    const saltRounds = 10;
    try {
        bcrypt.hash('123456789', saltRounds, async (err, hash) => {
            
            if(err){
                console.log(err);
            }
            else{
                const result = await userUpdate({
                    id_user:user.id_user,
                    passwword:hash
                });

                if (result === null) {
                    return res
                        .status(401)
                        .send('Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại');
                }

                const mailOption={
                    from:process.env.GMAIL,
                    to:user.email,
                    subject:'RESET PASSWORD',
                    text:'Password hiện tại của bạn là: 123456789'
                }

                transporter.sendMail(mailOption);

                return res.status(200).send("Check mail của bạn");
                
            }
        });
    
    } catch (error) {
        console.log(error);
    }
}

exports.changePass=async (req,res)=>{

    const oldpass=req.body.oldpass;
    const newpass=req.body.newpass;
    
    const user=req.user;
    
    const result =await bcrypt.compare(oldpass, user.password);

    if(!result){
        return res.status(401).send("Mật khẩu không chính xác");
    }

    const saltRounds = 10;
    try {
        bcrypt.hash(newpass, saltRounds, async (err, hash) => {
            
            if(err){
                console.log(err);
            }
            else{
                const result = await userUpdate({
                    id_user:user.id_user,
                    passwword:hash
                });

                if (result === null) {
                    return res
                        .status(401)
                        .send('Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại');
                }

                return res.status(200).send("Thành công");
                
            }
        });
    
    } catch (error) {
        console.log(error);
    }
}

exports.activeUser=async (req,res)=>{

    const username=req.query.username;

    if(username === undefined || username === null)
        return res.render('admin/active',{
            layout:'admin',
            message:'Link không hợp lệ',
            auth:false
        });

    const user=await userNotActiveGetUser(username);
    if(user === null){
        return res.render('admin/active',{
            message:'Username không hợp lệ',
            layout:'admin',
            auth:false
        });
    }

    const newUser = await userCreateUser(username,user.password,user.email,user.name);
    
    if (!newUser) {
        return res.render('admin/active',{
            message:'Có lỗi trong quá trình tạo tải khoản, xin vui lòng thử lại',
            layout:'admin',
            auth:false
        });
    }

    const uuid=uuidv4();

    const result=await customerCreate({
        uuid:uuid,
        id_user:newUser.null,
        ten:user.name,
        email:user.email
    });

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
        return res.render('admin/active',{
            message:'Đăng nhập không thành công, vui lòng thử lại',
            layout:'admin',
            auth:false
        });
    }

    userNotActiveRemove(username);

    res.cookie('auth',accessToken);

    return res.render('admin/active',{
        message:"Tài khoản của bạn đã được kích hoạt",
        layout:'admin',
        auth:true
    });
}
/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:41:01
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 02:02:23
 */
exports.renderLoginPage=async(req,res)=>{

    const {isAuth}=require('./service/auth');

    try {
        const isauth=await isAuth(req);

        if(isauth){
            res.redirect('/');
        }
        else{
            res.render('login');
        }
    } catch (error) {
        console.log(error);
    }
}
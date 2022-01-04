/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:48:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-04 01:48:49
 */
const { verifyToken } = require('./token');
const { getUser:userGetUser } = require('./user');

exports.isAuth = async (props) => {
    // Lấy access token từ header
    const accessTokenFromHeader = props.cookies.auth;
    if (!accessTokenFromHeader) {
        return false;
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return false;
    }
    return true;      
};

exports.isAdmin=async (props)=>{

    const accessTokenFromHeader = props.cookies.auth;
    if (!accessTokenFromHeader) {
        return false;
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return false;
    }

    try {
        const user = await userGetUser(verified.payload.username);
        
        if(user.role === "admin"){
            return true;
        }
        return false;

    } catch (error) {
        console.log(err);
        return false;
    }
}

exports.getUser=async (props)=>{

    const accessTokenFromHeader = props.cookies.auth;
    if (!accessTokenFromHeader) {
        return null;
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return null;
    }

    try {
        const user = await userGetUser(verified.payload.username);
        return user;   
    } catch (error) {
        console.log(error);
        return null;
    }
}
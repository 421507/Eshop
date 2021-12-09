/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:48:04
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 01:20:53
 */
const { verifyToken } = require('./token');

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
/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:19:54
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 01:19:49
 */
const { verifyToken } = require('../service/token');
const { getUser } = require('../service/user');

exports.isAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.cookies.auth;
    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return res
            .status(401)
            .send('Bạn không có quyền truy cập vào tính năng này!');
    }

    try {
        const user = await getUser(verified.payload.username);
        req.user = user;

        return next();      
    } catch (error) {
        console.log(err);
    }
};
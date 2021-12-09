/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-09 00:28:31
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-09 00:30:01
 */
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature, tokenLife) => {
    
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
};

exports.verifyToken = async (token, secretKey) => {
	try {
		return await verify(token, secretKey);
	} catch (error) {
		console.log(`Error in verify access token:  + ${error}`);
		return null;
	}
};
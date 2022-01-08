/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-07 15:15:29
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-07 15:45:54
 */
const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
    }
});
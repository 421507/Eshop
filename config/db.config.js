/**
 * @Author: Le Vu Huy
 * @Date:   2021-11-24 00:31:09
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-02 19:20:33
 */
/** Development */
// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "123456789",
//     DB: "eshop",
//     dialect: "mysql"
//   };

// ** Production */
module.exports = {
  HOST: "bk1zorhoargullwi7van-mysql.services.clever-cloud.com",
  USER: "unbptftvur2vuz37",
  PASSWORD: "GltkPlCyEkfUTwZgfw3F",
  DB: "bk1zorhoargullwi7van",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
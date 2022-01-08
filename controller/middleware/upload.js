/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-08 03:45:34
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-08 04:23:01
 */
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".png")
    }
})

const uploader={};

uploader.upload=multer({ storage: storage });


module.exports=uploader;
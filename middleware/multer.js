
//import multer
const multer = require("multer");
require('dotenv').config();
/* We will upload the file on server local directory, not in database. We will store the directory path into the database. */
// SET STORAGE
const storage = (folder) =>  multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("D5AL FIL UPLAOD");
        if (folder) {
                cb(null, `./uploads/${folder}/`);         
        }else{
            cb(null, `./uploads/`);         
        }
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, "-");
        const finalName = date + file.originalname 
        if (folder) {
            req.file_IMG = `http://${process.env.DB_HOST}:${process.env.APP_PORT}/uploads/${folder}/${finalName}` ;
        }else{
            req.file_IMG = `http://${process.env.DB_HOST}:${process.env.APP_PORT}/uploads/${finalName}` ;
        }
        cb(null, finalName);
    },
});

// add image filter 
// accept jpeg and png image
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const uploadImg= (folder) => multer({ storage: storage(folder), fileFilter: fileFilter });
exports.uploadImg = uploadImg;

import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.resolve(), "./public/images"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
    },
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(
            {
                message: "Unsupported file format",
            },
            false
        );
    }
}

class uploadImg{
    
    static uploadPhoto = multer({
        storage: multerStorage,
        fileFilter: multerFilter,
        limits: { fieldSize: 2000000 },
    })
    
    static productImgResize = async (req, res, next) => {
        if (!req.files) return next();
        //console.log(req.files);
        await Promise.all(
            req.files.map(async (file) => {
                //console.log(file.path);
                await sharp(file.path)
                    .resize(300, 300)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`./public/images/products/${file.filename}`);
                fs.unlinkSync(`./public/images/products/${file.filename}`);
               
            })
        );
        next();
    };
    
    static  blogImgResize = async (req, res, next) => {
        if (!req.files) return next();
        await Promise.all(
            req.files.map(async (file) => {
                await sharp(file.path)
                    .resize(300, 300)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`./public/images/blogs/${file.filename}`);
                    fs.unlinkSync(`./public/images/blogs/${file.filename}`);
            })
        );
        next();
    };
}

export default uploadImg;

import fs from 'fs';
import Cloudinary from "../utils/cloudinary.js";
import Blog from "../models/blogModel.js";

class uploadController {
    static uploadProductImages = async (req, res) => {
        //const {id} = req.params;
        try {
            const uploader = (path) => Cloudinary.cloudinaryUploadImg(path, "images");
            const urls = [];
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newpath = await uploader(path);
                urls.push(newpath);
                fs.unlinkSync(path);
            }
           const images = urls.map((file) => {
                return file;
            });
            res.json(images);
        }
        catch (err) {
            res.status(404).json(err);
        }
    }

    static uploadBlogImages = async (req, res) => {
        const {id} = req.params;
        try {
            const uploader = (path) => Cloudinary.cloudinaryUploadImg(path, "images");
            const urls = [];
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newpath = await uploader(path);
                urls.push(newpath);
                fs.unlinkSync(path);
            }
            // const images = urls.map((file) => {
            //     return file;
            // });
            const findblog = await Blog.findByIdAndUpdate(
                {_id:id},
                {images:urls.map(file =>{return file})},
                {new:true}
            )
            //res.json(images);
            res.json(findblog);
        }
        catch (err) {
            res.status(404).json(err);
        }
    }

    static deleteImages = async (req, res) => {
        const {id} = req.params;
        try{
            const deleted = Cloudinary.cloudinaryDeleteImg(id,"images");
            res.json({message:"Deleted"});
        }catch (err) {
            res.status(404).json(err);
        }
    }
}

export default uploadController;
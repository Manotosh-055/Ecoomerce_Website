import express from "express";
import uploadController from "../controller/uploadController.js";
const router = express.Router();
import userAuthMiddleware from "../middlewares/auth-middleware.js";
import uploadImg from '../middlewares/uploadimages.js';

router.post('/upload-product-img',
    userAuthMiddleware.checkUserAuth,
    userAuthMiddleware.isAdmin,
    uploadImg.uploadPhoto.array("images",10),
    uploadImg.productImgResize,
    uploadController.uploadProductImages);

router.post('/upload-blog-img/:id',
    userAuthMiddleware.checkUserAuth,
    userAuthMiddleware.isAdmin,
    uploadImg.uploadPhoto.array("images",5),
    uploadImg.blogImgResize,
    uploadController.uploadBlogImages);

router.delete('/delete-img/:id',
    userAuthMiddleware.checkUserAuth,
    userAuthMiddleware.isAdmin,
    uploadController.deleteImages);

export default router;
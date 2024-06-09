import express from "express";
const router = express.Router();
import blogCategoryController from "../controller/blogCategoryController.js";
import userAuthMiddleware from "../middlewares/auth-middleware.js";


router.get('/get-all-blog-category',blogCategoryController.getallBlogCategory);
router.get('/get-a-blog-category/:id',blogCategoryController.getaBlogCategory);

router.post('/add-blog-category', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, blogCategoryController.createBlogCategory);
router.post('/update-blog-category/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, blogCategoryController.updateBlogCategory);
router.delete('/delete-blog-category/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, blogCategoryController.deleteBlogCategory);

export default router;
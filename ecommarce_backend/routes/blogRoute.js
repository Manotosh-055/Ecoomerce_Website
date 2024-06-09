import express from "express";
const router = express.Router();
import blogController from "../controller/blogController.js";
import userAuthMiddleware from "../middlewares/auth-middleware.js";


router.get('/get-all-blog-post',blogController.getallBlogs);
router.get('/get-a-blog/:id',blogController.getaBlog);

router.put('/likePost', userAuthMiddleware.checkUserAuth, blogController.LikeBlog);
router.put('/dislikePost', userAuthMiddleware.checkUserAuth, blogController.DislikeBlog);

router.post('/add-blog-post', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, blogController.createBlogPost);
router.post('/update-blog-post/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, blogController.updateBlogPost);
router.delete('/delete-blog-post/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, blogController.deleteBlogPost);

export default router;
import express from "express";
const router = express.Router();
import productController from "../controller/productController.js";
import userAuthMiddleware from "../middlewares/auth-middleware.js";



router.post('/create-product',userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, productController.createProduct);

router.get('/get-a-product/:id',productController.getaProduct);
router.get('/get-all-product',productController.getAllProduct);

router.put('/update-product/:id',userAuthMiddleware.checkUserAuth , userAuthMiddleware.isAdmin, productController.updateProduct);
router.delete('/delete-product/:id',userAuthMiddleware.checkUserAuth , userAuthMiddleware.isAdmin, productController.deleteProduct);

router.put('/add-to-wishlist',userAuthMiddleware.checkUserAuth, productController.AddToWishlist);
router.put('/add-to-compare',userAuthMiddleware.checkUserAuth, productController.AddToCompare);
router.put('/rating',userAuthMiddleware.checkUserAuth, productController.prodRating);



export default router;
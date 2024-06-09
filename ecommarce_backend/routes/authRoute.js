import express from "express";
const router = express.Router();
import userController from '../controller/userController.js';
import userAuthMiddleware from "../middlewares/auth-middleware.js";
import { paymentController } from "../controller/paymentController.js";

// for user authentication
router.use('/userinfo/:id',userAuthMiddleware.checkUserAuth);
router.use('/update-user/:id',userAuthMiddleware.checkUserAuth);
router.use('/delete-user/:id',userAuthMiddleware.checkUserAuth);
router.use('/get-wishlist',userAuthMiddleware.checkUserAuth);
router.use('/user-address',userAuthMiddleware.checkUserAuth);
router.use('/changePassword',userAuthMiddleware.checkUserAuth);

// for isAdmin authentication
router.use('/userinfo/:id',userAuthMiddleware.isAdmin);
router.use('/update-user/:id',userAuthMiddleware.isAdmin);
router.use('/delete-user/:id',userAuthMiddleware.isAdmin);


// routes
router.post('/register',userController.UserReg);
router.post('/login',userController.UserLog);
router.post('/admin-login',userController.AdminLog);
router.post('/cart', userAuthMiddleware.checkUserAuth, userController.userCart);
router.post('/order/checkout', userAuthMiddleware.checkUserAuth, paymentController.checkout);
router.post('/order/paymentVerification', userAuthMiddleware.checkUserAuth, paymentController.paymentVerification);
//router.post('/cart/applycoupon', userAuthMiddleware.checkUserAuth, userController.applyCoupon);
router.post('/cart/create-order', userAuthMiddleware.checkUserAuth, userController.createOrder);

router.get('/usersinfo',userController.getAllUser);
router.get('/userinfo/:id',userController.getSingleUser);
router.get('/get-wishlist',userController.getWishlist);
router.get('/get-compare',userAuthMiddleware.checkUserAuth, userController.getCompare);
router.get('/user-cart', userAuthMiddleware.checkUserAuth, userController.getUserCart);
router.get('/getMonthWiseOrderIncome', userAuthMiddleware.checkUserAuth,userAuthMiddleware.isAdmin, userController.getMonthWiseOrderIncome);
router.get('/getYearlyTotalOrders', userAuthMiddleware.checkUserAuth,userAuthMiddleware.isAdmin, userController.getYearlyTotalOrders);
router.get('/get-myorder', userAuthMiddleware.checkUserAuth, userController.getMyOrder);
router.get('/get-all-order', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, userController.getAllOrders);
router.get('/get-single-order/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, userController.getSingleOrder);

router.put('/update-user',userAuthMiddleware.checkUserAuth, userController.updateAUser);
router.delete('/delete-user/:id',userController.deleteSingleUser);
router.delete('/delete-product-cart/:id', userAuthMiddleware.checkUserAuth, userController.removeCart);
router.delete('/empty-cart', userAuthMiddleware.checkUserAuth, userController.emptyCart);
router.put('/user-address',userController.userAddress);
router.put('/update-order/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, userController.updateOrder);

router.post('/forgot-password-token', userController.resetPasswordSendMail);
router.post('/reset-password/:id/:token',userController.resetPassword);
router.post('/changePassword',userController.userChangePassword);

export default router;

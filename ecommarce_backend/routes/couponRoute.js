import express from "express";
import couponController from "../controller/couponController.js";
const router = express.Router();
import userAuthMiddleware from "../middlewares/auth-middleware.js";


router.get('/get-all-coupon', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin ,couponController.getallCoupon);
router.get('/get-a-coupon/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin ,couponController.getaCoupon);

router.post('/add-coupon',userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, couponController.createCoupon);
router.post('/update-coupon/:id',userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, couponController.updateCoupon);
router.delete('/delete-coupon/:id',userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, couponController.deleteCoupon);



export default router;
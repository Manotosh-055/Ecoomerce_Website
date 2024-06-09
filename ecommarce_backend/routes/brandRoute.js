import express from "express";
const router = express.Router();
import brandController from "../controller/brandController.js";
import userAuthMiddleware from "../middlewares/auth-middleware.js";

router.get('/get-all-brand',brandController.getallBrand);
router.get('/get-a-brand/:id',brandController.getaBrand);

router.post('/add-brand', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, brandController.createBrand);
router.post('/update-brand/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, brandController.updateBrand);
router.delete('/delete-brand/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, brandController.deleteBrand);

export default router;
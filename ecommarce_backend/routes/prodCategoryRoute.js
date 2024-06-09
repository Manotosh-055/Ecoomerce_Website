import express from "express";
const router = express.Router();
import prodCategoryController from "../controller/prodCategoryController.js";
import userAuthMiddleware from "../middlewares/auth-middleware.js";

router.get('/get-all-prod-category',prodCategoryController.getallProdCategory);
router.get('/get-a-prod-category/:id',prodCategoryController.getaProdCategory);

router.post('/add-category', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, prodCategoryController.createCategory);
router.post('/update-category/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, prodCategoryController.updateProdCategory);
router.delete('/delete-category/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, prodCategoryController.deleteProdCategory);

export default router;
import express from "express";
const router = express.Router();
import colorController from "../controller/colorController.js";
import userAuthMiddleware from "../middlewares/auth-middleware.js";

router.get('/get-all-color',colorController.getallColor);
router.get('/get-a-color/:id',colorController.getaColor);

router.post('/add-color', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, colorController.createColor);
router.post('/update-color/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, colorController.updateColor);
router.delete('/delete-color/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, colorController.deleteColor);

export default router;
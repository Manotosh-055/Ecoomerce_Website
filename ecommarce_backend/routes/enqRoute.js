import express from "express";
const router = express.Router();
import enqController from "../controller/enqController.js";
import userAuthMiddleware from "../middlewares/auth-middleware.js";

router.get('/get-all-enquiry',enqController.getallEnquiry);
router.get('/get-a-enquiry/:id',enqController.getaEnquiry);

router.post('/add-enquiry', enqController.createEnquiry);
router.post('/update-enquiry/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, enqController.updateEnquiry);
router.delete('/delete-enquiry/:id', userAuthMiddleware.checkUserAuth, userAuthMiddleware.isAdmin, enqController.deleteEnquiry);

export default router;
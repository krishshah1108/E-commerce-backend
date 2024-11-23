import auhtController from "./controller/authController.js";
import express from "express";
import productController from "./controller/productController.js";
import upload from "../../middlewares/multerConfig.js";
import authentication from "../../middlewares/authentication.js";


const router = express.Router();

router.post("/register", auhtController.companyRegistration);
router.post("/login", auhtController.companyLogin);

//product routes
router.post("/product/add", authentication.isCompanyAuthenticated,upload.single("image"), productController.addProduct);
router.post("/product/delete", authentication.isCompanyAuthenticated, productController.deleteProductById);

export default router;
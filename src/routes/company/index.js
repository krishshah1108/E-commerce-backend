import auhtController from "./controller/authController.js";
import express from "express";

const router = express.Router();

router.post("/register", auhtController.companyRegistration);
router.post("/login", auhtController.companyLogin);

export default router;
import express from "express";
import authController from "./controller/authController.js";

const router = express.Router();

router.post("/register", authController.userRegistration);
export default router;

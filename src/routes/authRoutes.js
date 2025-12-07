import express from "express";
import { register, login } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../validators/authValidators.js";
import { validateRequest } from "../middlewares/validate.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);

export default router;

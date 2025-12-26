import express, { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import {
  userLoginSchema,
  userRegisterSchema,
} from "../validators/auth.schema.js";

const router: Router = express.Router();

router.post("/register", validateData(userRegisterSchema, "body"), register);
router.post("/login", validateData(userLoginSchema, "body"), login);

export default router;

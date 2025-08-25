import express from "express";
import { login, createUser } from "../controller/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", createUser);

export default router;

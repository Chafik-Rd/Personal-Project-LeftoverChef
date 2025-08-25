import express from "express";
import apiUser from "./user.js";

const router = express.Router();
router.use("/user",apiUser);
export default router;

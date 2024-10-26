import express from "express";
import { authCheck, login, logout, signup } from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";


const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/authcheck",protectRoute,authCheck)


export default router
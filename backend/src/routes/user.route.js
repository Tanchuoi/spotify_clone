import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get("/", isAuthMiddleware, getAllUsers);

export default router;

import { Router } from "express";
import { isAuthMiddleware } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages } from "../controllers/user.controller.js";

const router = Router();

router.get("/", isAuthMiddleware, getAllUsers);
router.get("/messages/:userId", isAuthMiddleware, getMessages);

export default router;

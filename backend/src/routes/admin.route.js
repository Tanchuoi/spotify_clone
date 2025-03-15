import { Router } from "express";
import {
  isAdminMiddleware,
  isAuthMiddleware,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isAuthMiddleware, isAdminMiddleware, (req, res) => {
  res.send("Get from admin route");
});

export default router;

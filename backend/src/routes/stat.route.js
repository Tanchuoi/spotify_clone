import { Router } from "express";

import {
  isAdminMiddleware,
  isAuthMiddleware,
} from "../middlewares/auth.middleware.js";

import { getStats } from "../controllers/stat.controller.js";

const router = Router();

router.get("/", isAuthMiddleware, isAdminMiddleware, getStats);

export default router;

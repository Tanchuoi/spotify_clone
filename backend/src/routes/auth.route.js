import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get from auth route");
});

export default router;

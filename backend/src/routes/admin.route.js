import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get from admin route");
});

export default router;

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get from album route");
});

export default router;

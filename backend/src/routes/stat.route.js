import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get from stat route");
});

export default router;

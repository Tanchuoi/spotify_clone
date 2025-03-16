import { Router } from "express";
import {
  isAdminMiddleware,
  isAuthMiddleware,
} from "../middlewares/auth.middleware.js";
import {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  getAllFeaturedSongs,
  getAllTrendingSongs,
  getAllMadeForYouSongs,
} from "../controllers/song.controller.js";

const router = Router();

router.get("/", isAuthMiddleware, isAdminMiddleware, getAllSongs);
router.get("/:id", getSongById);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);
router.get("/featured", getAllFeaturedSongs);
router.get("/trending", getAllTrendingSongs);
router.get("/made-for-you", getAllMadeForYouSongs);

export default router;

import { Router } from "express";
import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../controllers/album.controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:id", getAlbumById);
router.post("/", createAlbum);
router.put("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

export default router;

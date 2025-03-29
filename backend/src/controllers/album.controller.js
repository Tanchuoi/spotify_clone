import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Failed to upload file to cloudinary");
  }
};

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find().populate("songs");
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate("songs");
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    // Check if image file is provided
    if (!req.files?.imageFile) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;

    // Upload image to cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Create new album
    const album = new Album({
      title,
      artist,
      releaseYear: parseInt(releaseYear),
      imageUrl,
      songs: [],
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.error("Create album error:", error);
    next(error);
  }
};

export const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, artist, releaseYear } = req.body;

    // Find album
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    // Update fields
    const updateData = {
      title: title || album.title,
      artist: artist || album.artist,
      releaseYear: releaseYear ? parseInt(releaseYear) : album.releaseYear,
    };

    // If new image is provided, upload it
    if (req.files?.imageFile) {
      const imageUrl = await uploadToCloudinary(req.files.imageFile);
      updateData.imageUrl = imageUrl;
    }

    // Update album
    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).populate("songs");

    res.status(200).json(updatedAlbum);
  } catch (error) {
    console.error("Update album error:", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find album
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    // Delete all songs in the album
    await Song.deleteMany({ albumId: id });

    // Delete album
    await Album.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Album and its songs deleted successfully" });
  } catch (error) {
    console.error("Delete album error:", error);
    next(error);
  }
};

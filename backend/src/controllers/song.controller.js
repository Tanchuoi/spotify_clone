import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getAllFeaturedSongs = async (req, res) => {
  try {
    // fetch 6 random songs
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getAllMadeForYouSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getAllTrendingSongs = async (req, res) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 8 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getSongById = async (req, res) => {};

export const createSong = async (req, res) => {};

export const updateSong = async (req, res) => {};

export const deleteSong = async (req, res) => {};

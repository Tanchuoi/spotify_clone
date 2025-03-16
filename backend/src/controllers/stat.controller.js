import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, totalArtist] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.distinct("artist").count(),
      ]);
    res.status(200).json({
      totalSongs,
      totalAlbums,
      totalUsers,
      totalArtist,
    });
  } catch (error) {
    next(error);
  }
};

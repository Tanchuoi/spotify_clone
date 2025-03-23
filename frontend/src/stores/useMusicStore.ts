import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { Album, Song } from "@/types/index";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  fetchSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,

  fetchSongs: async () => {},
  fetchAlbums: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
    } catch (error: any) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },
}));

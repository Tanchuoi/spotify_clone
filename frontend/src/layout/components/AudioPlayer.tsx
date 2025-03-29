import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // handle play/pause logic
  useEffect(() => {
    console.log("=== Play/Pause effect triggered ===");
    console.log("isPlaying:", isPlaying);
    console.log("currentSong:", currentSong);
    console.log("audioRef.current:", audioRef.current);

    if (!audioRef.current) {
      console.error("Audio element not found");
      return;
    }

    if (!currentSong?.audioUrl) {
      console.error("No audio URL found for current song");
      return;
    }

    // Use the audioUrl directly from the currentSong
    const audioUrl = currentSong.audioUrl;
    console.log("Setting audio URL:", audioUrl);

    if (isPlaying) {
      console.log("Attempting to play audio");
      audioRef.current.src = audioUrl;

      // Add error handling for audio loading
      audioRef.current.onerror = (e) => {
        console.error("Error loading audio:", e);
      };

      audioRef.current.onloadeddata = () => {
        console.log("Audio data loaded successfully");
      };

      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started playing successfully");
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            if (error.name === "NotAllowedError") {
              console.log("Autoplay was prevented. User interaction required.");
            }
          });
      }
    } else {
      console.log("Pausing audio");
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      console.error("Audio element not found for ended event");
      return;
    }

    const handleEnded = () => {
      console.log("Song ended, playing next");
      playNext();
    };

    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    console.log("=== Song change effect triggered ===");
    console.log("currentSong:", currentSong);
    console.log("audioRef.current:", audioRef.current);

    if (!audioRef.current || !currentSong) {
      console.log("No audio element or current song");
      return;
    }

    const audio = audioRef.current;

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    console.log("Song change detected:", isSongChange);
    console.log("Previous song URL:", prevSongRef.current);
    console.log("New song URL:", currentSong.audioUrl);

    if (isSongChange) {
      console.log("Setting new audio source");
      audio.src = currentSong.audioUrl;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audioUrl;

      if (isPlaying) {
        console.log("Auto-playing new song");
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("New song started playing successfully");
            })
            .catch((error) => {
              console.error("Error auto-playing new song:", error);
            });
        }
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} preload="auto" crossOrigin="anonymous" />;
};

export default AudioPlayer;

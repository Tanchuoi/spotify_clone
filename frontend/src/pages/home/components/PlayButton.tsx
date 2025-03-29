import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";

interface PlayButtonProps {
  song: Song;
}

const PlayButton = ({ song }: PlayButtonProps) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handleClick = (e: React.MouseEvent) => {
    console.log("PlayButton clicked");
    console.log("Current song:", currentSong);
    console.log("Clicked song:", song);
    console.log("Is current song:", isCurrentSong);
    console.log("Is playing:", isPlaying);

    e.preventDefault();
    e.stopPropagation();

    if (isCurrentSong) {
      console.log("Toggling play/pause");
      togglePlay();
    } else {
      console.log("Setting new current song");
      setCurrentSong(song);
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="absolute bottom-2 right-2 rounded-full bg-green-500 hover:bg-green-400 
      hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-50"
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="h-5 w-5 text-black" />
      ) : (
        <Play className="h-5 w-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;

import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useMusicStore } from "@/stores/useMusicStore";
import { buttonVariants } from "@/components/ui/button";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { albums, isLoading, fetchSongs, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
  }, [fetchAlbums, fetchSongs]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigator */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="hidden md:inline">Home</span>
          </Link>
        </div>
        <div className="mt-1">
          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircleIcon className="w-6 h-6" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-start mb-4">
          <Library className="w-6 h-6" />
          <span className="hidden md:inline ml-2">Playlists</span>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-zinc-800"
                >
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="size-12 shrink-0 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;

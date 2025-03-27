import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import Topbar from "@/components/Topbar";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const {
    featuredSongs,
    trendingSongs,
    madeForYouSongs,
    isLoading,
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]);

  console.log({ featuredSongs, trendingSongs, madeForYouSongs, isLoading });

  return (
    <main className="round-md overflow-hidden h-full bg-gradient-to-b from-zinc-900 to to-zinc-800 ">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)] px-4">
        <h1 className="text-2xl sm:text-3xl font-bold my-6 ">Good Afternoon</h1>
        <FeaturedSection />

        <div className="">
          <SectionGrid
            songs={madeForYouSongs}
            title="Made For You"
            isLoading={isLoading}
          />
          <SectionGrid
            songs={trendingSongs}
            title="Trending"
            isLoading={isLoading}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;

import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();

  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-8">
        <Header />
        <DashboardStats />
      </div>

      <div className="flex-1 px-8 pb-8 overflow-hidden">
        <Tabs defaultValue="songs" className="h-full flex flex-col">
          <TabsList className="p-1 bg-zinc-800/50 mb-6">
            <TabsTrigger
              value="songs"
              className="data-[state=active]:bg-zinc-700"
            >
              <Music className="mr-2 size-4" />
              Songs
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-zinc-700"
            >
              <Album className="mr-2 size-4" />
              Albums
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="songs" className="h-full">
              <SongsTabContent />
            </TabsContent>
            <TabsContent value="albums" className="h-full">
              <AlbumsTabContent />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
export default AdminPage;

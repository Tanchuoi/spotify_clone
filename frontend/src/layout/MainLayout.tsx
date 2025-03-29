import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendActivity from "./components/FriendActivity";
import { PlaybackControls } from "./components/PlaybackControls";
import AudioPlayer from "./components/AudioPlayer";

const MainLayout = () => {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex overflow-hidden h-full p-2 "
      >
        {/* Leftside bar */}
        <ResizablePanel defaultSize={20} maxSize={20} minSize={10}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="bg-black w-2 rounded-lg transition-colors" />
        {/* Main content */}
        <ResizablePanel defaultSize={50}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="bg-black w-2 rounded-lg transition-colors" />
        {/* Rightside bar */}
        <ResizablePanel
          defaultSize={20}
          minSize={10}
          collapsedSize={0}
          maxSize={20}
        >
          <FriendActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
      <AudioPlayer />
      <PlaybackControls />
    </div>
  );
};

export default MainLayout;

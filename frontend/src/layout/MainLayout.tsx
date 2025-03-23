import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";

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
        <ResizableHandle />
        {/* Rightside bar */}
        <ResizablePanel
          defaultSize={20}
          minSize={10}
          collapsedSize={0}
          maxSize={20}
        >
          <div className="flex h-[200px] items-center justify-center p-6">
            <span className="font-semibold">righthand</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;

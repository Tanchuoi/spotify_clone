import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) return;
        // Save the user to the database
        console.log("Syncing user to database:", user.id);
        const response = await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
        console.log("Sync response:", response.data);
      } catch (error) {
        console.error("Error syncing user:", error);
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging in</h3>
          <p className="text-zinc-400 text-sm">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;

import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import fs from "fs";
import { clerkMiddleware } from "@clerk/express";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
import cron from "node-cron";
import fileUpload from "express-fileupload";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();

const httpServer = createServer(app);
initializeSocket(httpServer);

// Enable CORS with credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Initialize Clerk middleware
app.use(clerkMiddleware());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    createParentPath: true,
    tempFileDir: path.join(__dirname, "/tmp"),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  })
);

const tempDir = path.join(process.cwd(), "/tmp");

// delete temp files every hour
cron.schedule("0 * * * *", () => {
  fs.readdir(tempDir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.unlink(path.join(tempDir, file), (err) => {
        if (err) throw err;
      });
    });
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "../public")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public", "index.html"));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log("Server running on port " + PORT);
  connectDB();
});

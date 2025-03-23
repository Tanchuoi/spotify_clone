import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./lib/db.js";
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

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(clerkMiddleware()); // add auth to req object -> req.auth

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  fileUpload({
    useTempFiles: true,
    createParentPath: true,
    tempFileDir: path.join(__dirname, "/tmp"),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
  connectDB();
});

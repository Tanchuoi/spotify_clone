import { clerkClient } from "@clerk/express";

export const isAuthMiddleware = async (req, res, next) => {
  try {
    // Log auth information for debugging
    console.log("Auth middleware - Request headers:", req.headers);
    console.log("Auth middleware - Auth object:", req.auth);

    if (!req.auth?.userId) {
      console.log("Auth middleware - No userId found in auth object");
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Auth middleware - Authorized userId:", req.auth.userId);
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdminMiddleware = async (req, res, next) => {
  try {
    console.log(
      "Admin middleware - Checking admin status for userId:",
      req.auth.userId
    );
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const userEmail = currentUser.primaryEmailAddress?.emailAddress;
    const adminEmail = process.env.ADMIN_EMAIL;

    console.log("Admin middleware - User email:", userEmail);
    console.log("Admin middleware - Admin email:", adminEmail);

    const isAdmin = userEmail === adminEmail;

    if (!isAdmin) {
      console.log("Admin middleware - User is not admin");
      return res.status(401).json({ message: "User is not admin" });
    }
    console.log("Admin middleware - User is admin");
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

import { clerkClient } from "@clerk/express";

export const isAuthMiddleware = (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const isAdminMiddleware = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      currentUser.primaryEmailAddress.emailAddress === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      return res.status(401).json({ message: "User is not admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

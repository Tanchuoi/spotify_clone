import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    console.log("Received user data:", { id, firstName, lastName, imageUrl });

    const user = await User.findOne({ clerkId: id });
    console.log("Existing user found:", user);

    // If user does not exist, create a new user
    if (!user) {
      console.log("Creating new user...");
      const newUser = await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      console.log("New user created:", newUser);
      return res
        .status(201)
        .json({ success: true, message: "User created", user: newUser });
    } else {
      // If user exists, update their info in case it changed
      console.log("Updating existing user...");
      user.fullName = `${firstName} ${lastName}`;
      user.imageUrl = imageUrl;
      const updatedUser = await user.save();
      console.log("User updated:", updatedUser);
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user: updatedUser,
      });
    }
  } catch (error) {
    console.log("Error in authCallback:", error);
    console.log("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

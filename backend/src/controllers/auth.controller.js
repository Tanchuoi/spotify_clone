import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    // If user does not exist, create a new user
    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("error with auth", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

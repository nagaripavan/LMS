import { clerkClient } from "@clerk/express";

export const updateRoleEducator = async (req, res) => {
  try {
    const { userId } = req.auth();


    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: userId not found",
      });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    return res.json({
      success: true,
      message: "You can publish a course now",
    });
  } catch (error) {
    console.log("Clerk error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const User = require("../models/users");
const Profile = require("../models/profile");
const { validationResult } = require("express-validator");

// get user profile
exports.getProfile = async (req, res, next) => {
  const userId = req.user.userId;
  console.log("userId", userId);
  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      const error = new Error("There is no profile for this user");
      error.statusCode = 400;
      throw next(error);
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    next(error);
  }
};

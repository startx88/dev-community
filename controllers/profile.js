const User = require("../models/users");
const Profile = require("../models/profile");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    console.log("hello", profiles);
    if (!profiles) {
      const error = new Error("There is no profiles");
      error.statusCode = 404;
      throw next(error);
    }

    res.status(200).json({
      success: true,
      message: "All profiles",
      profiles
    });
  } catch (error) {
    next(error);
  }
};

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

// add profile
exports.addProfile = async (req, res, next) => {
  const userId = req.user.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    gitusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;

  const userprofile = {};
  // common info
  userprofile.user = userId;
  userprofile.company = company;
  userprofile.website = website;
  userprofile.location = location;
  userprofile.status = status;
  userprofile.skills = skills.split(",").map(skill => skill.trim());
  userprofile.bio = bio;
  userprofile.gitusername = gitusername;

  // social object
  userprofile.social = {};
  userprofile.social.youtube = youtube;
  userprofile.social.twitter = twitter;
  userprofile.social.facebook = facebook;
  userprofile.social.linkedin = linkedin;
  userprofile.social.instagram = instagram;

  try {
    const profileExist = await Profile.findOne({ user: userId });

    // update profile
    if (profileExist) {
      const profile = await Profile.findOneAndUpdate(
        { user: userId },
        { $set: userprofile },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profileId: profile._id
      });
    }

    // create new profile
    const profile = new Profile(userprofile);
    const result = await profile.save();
    res.status(201).json({
      success: true,
      message: "Profile added successfully",
      profileId: result._id
    });
  } catch (error) {
    next(error);
  }
};

// Get profile by user id
exports.getProfileByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar"
    ]);

    if (!profile) {
      const error = new Error("There is no profile for this user");
      error.statusCode = 400;
      throw next(error);
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/**
 * Delete user, profile and its posts
 */
exports.deleteUser = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    await Profile.findOneAndRemove({ user: userId });
    const userRes = await User.findByIdAndRemove(userId);

    res.status(200).json({
      success: true,
      message: "User removed successfully!",
      userId: userRes._id
    });
  } catch (err) {
    console.log("error", err);
    if (err.kind === "ObjectId") {
      const error = new Error("Profile not found, invalid user id");
      next(error);
    }
    next(err);
  }
};

/**
 * Activate user
 */
exports.activeUser = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    user.active = 1;
    const result = await user.save();
    res.status(200).json({
      success: true,
      message: "User activated successfully!",
      userId: result._id
    });
  } catch (err) {
    console.log("error", err);
    if (err.kind === "ObjectId") {
      const error = new Error("Profile not found, invalid user id");
      next(error);
    }
    next(err);
  }
};

/**
 * Deactive user
 */
exports.deactiveUser = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    user.active = 0;
    const result = await user.save();
    res.status(200).json({
      success: true,
      message: "User deactivated successfully!",
      userId: result._id
    });
  } catch (err) {
    console.log("error", err);
    if (err.kind === "ObjectId") {
      const error = new Error("Profile not found, invalid user id");
      next(error);
    }
    next(err);
  }
};

////////////////////////////////////////////////////////////////
// ********************* User Experience ***********************
////////////////////////////////////////////////////////////////
exports.addUserExperience = async (req, res, next) => {
  const userId = req.user.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  let { title, company, location, from, to, current, description } = req.body;
  from = Date(from);
  to = Date(to);
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar"
    ]);

    if (!profile) {
      const error = new Error("User profile not found");
      error.statusCode = 404;
      throw next(error);
    }

    profile.experience.unshift(newExp);
    await profile.save();
    res.status(200).json({
      success: true,
      message: "User experience update successfully!",
      profile
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

exports.updateUserExperience = async (req, res, next) => {
  const userId = req.user.userId;
  const expId = req.params.expId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  let { title, company, location, from, to, current, description } = req.body;
  from = Date(from);
  to = Date(to);
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar"
    ]);

    if (!profile) {
      const error = new Error("User profile not found");
      error.statusCode = 404;
      throw next(error);
    }
    // existing exp
    const existingExp = profile.experience;
    // find Index for updateing exp
    const findExpIndex = existingExp.map(item => item._id).indexOf(expId);
    let updatedExp = existingExp[findExpIndex];

    if (!updatedExp) {
      const error = new Error("not found");
      error.statusCode = 404;
      throw next(error);
    }

    updatedExp = newExp;

    existingExp[findExpIndex] = updatedExp;

    profile.experience.splice(findExpIndex, existingExp);

    await profile.save();
    res.status(200).json({
      success: true,
      message: "User experience update successfully!",
      profile
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

exports.deleteUserExperience = async (req, res, next) => {
  const userId = req.user.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  let { title, company, location, from, to, current, description } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar"
    ]);

    if (!profile) {
      const error = new Error("User profile not found");
      error.statusCode = 404;
      throw next(error);
    }

    profile.experience.unshift(newExp);
    await profile.save();
    res.status(200).json({
      success: true,
      message: "User experience update successfully!",
      profile
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/**
 * Update user education
 */
exports.userEducation = async (req, res, next) => {
  const userId = req.user.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }
  try {
    const user = await User.findById(userId);
    user.active = 0;
    const result = await user.save();
    res.status(200).json({
      success: true,
      message: "User deactivated successfully!",
      userId: result._id
    });
  } catch (err) {
    console.log("error", err);
    if (err.kind === "ObjectId") {
      const error = new Error("Profile not found, invalid user id");
      next(error);
    }
    next(err);
  }
};

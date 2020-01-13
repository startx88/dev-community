const User = require("../models/users");
const Profile = require("../models/profile");
const { validationResult } = require("express-validator");
const request = require("request");

// Profiles
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

  try {
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      const error = new Error("There is no profile for this user");
      error.statusCode = 404;
      throw next(error);
    }
    console.log(profile);

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
  userprofile.skills = skills;
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

exports.deleteUserExperience = async (req, res, next) => {
  const userId = req.user.userId;
  const expId = req.params.expId;

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
    const removeIndex = profile.experience.map(item => item.id).indexOf(expId);
    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.status(200).json({
      success: true,
      message: "User experience deleted successfully!",
      profile
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

////////////////////////////////////////////////////////////////
// ********************* User Education ***********************
////////////////////////////////////////////////////////////////
exports.addUserEducation = async (req, res, next) => {
  const userId = req.user.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  let {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
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

    profile.education.unshift(newEdu);
    const result = await profile.save();
    console.log("education", result);

    res.status(200).json({
      success: true,
      message: "User education added successfully!",
      profileId: result._id
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

// delete user education
exports.deleteUserEducation = async (req, res, next) => {
  const userId = req.user.userId;
  const eduId = req.params.eduId;

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
    const removeIndex = profile.education.map(item => item.id).indexOf(eduId);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.status(200).json({
      success: true,
      message: "User education deleted successfully!",
      profile
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

////////////////////////////////////////////////////////////////
//******************* User github profile ********************
////////////////////////////////////////////////////////////////
exports.getGithubProfile = async (req, res, next) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (err, response, body) => {
      if (err) console.log(err);
      if (response.statusCode !== 200) {
        const error = new Error("No github profile found");
        error.statusCode = 404;
        throw next(error);
      }
      res.status(200).json({
        success: true,
        message: "github repositories",
        repo: JSON.parse(body)
      });
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

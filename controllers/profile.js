const User = require("../models/users");
const Profile = require("../models/profile");
const { validationResult } = require("express-validator");
const request = require("request");
const { isAdmin, isUserActive } = require('../middleware/isUser');

// Profiles
exports.getAllProfiles = async (req, res, next) => {
  const query = req.query.active;

  try {
    const allProfile = await Profile.find().populate("user", [
      "name",
      "avatar",
      "email",
      "active"
    ]);

    if (!allProfile) {
      const error = new Error("There is no profiles");
      error.statusCode = 404;
      throw next(error);
    }

    const profiles = allProfile.filter(profile => query ? profile.user.active === Number(query) : profile)

    res.status(200).json({
      success: true,
      message: "Get all profiles",
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
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar", "email",
      "active"
    ]);

    if (!profile) {
      const error = new Error("There is no profile for this user");
      error.statusCode = 404;
      throw next(error);
    }

    isUserActive(profile.user.active); // if user active

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    next(error);
  }
};

// Get profile by user id
exports.getProfileByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const profile = await Profile.findOne({ user: userId })
      .populate("user", [
        "name",
        "avatar",
        "email",
        "active"
      ]);

    if (!profile) {
      const error = new Error("There is no profile for this user");
      error.statusCode = 400;
      throw next(error);
    }
    isUserActive(profile.user.active, "This user profile is deactivate"); // if user active
    res.status(200).json({
      success: true,
      profile
    });
  } catch (err) {
    console.log("error", err);
    next(err);
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

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.active = 1;
    const result = await user.save();
    res.status(200).json({
      success: true,
      message: "User activated successfully!",
      userId: result._id,
      user
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
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    isAdmin(userId);
    user.active = 0;
    const result = await user.save();
    res.status(200).json({
      success: true,
      message: "User deactivated successfully!",
      userId: result._id,
      user
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
      "avatar",
      "email",
      "active"
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
      profileId: profile._id,
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
      "avatar",
      "email",
      "active"
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
      expId: expId
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
      "avatar",
      "email",
      "active"
    ]);

    if (!profile) {
      const error = new Error("User profile not found");
      error.statusCode = 404;
      throw next(error);
    }

    profile.education.unshift(newEdu);
    const result = await profile.save();

    res.status(200).json({
      success: true,
      message: "User education added successfully!",
      profileId: result._id,
      profile
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
      "avatar",
      "email",
      "active"
    ]);

    if (!profile) {
      const error = new Error("User profile not found");
      error.statusCode = 404;
      throw next(error);
    }
    const removeIndex = profile.education.map(item => item.id).indexOf(eduId);
    profile.education.splice(removeIndex, 1);
    const result = await profile.save();
    res.status(200).json({
      success: true,
      message: "User education deleted successfully!",
      educationId: eduId
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

    console.log(options)
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




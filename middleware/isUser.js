const Post = require("../models/posts");
const User = require("../models/users");

// check is user
exports.isUser = async userId => {
  try {
    const post = await Post.findOne({ user: userId });

    if (post.user.toString() !== userId) {
      const error = new Error("User not authorized");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    throw error;
  }
};



//@Admin
exports.isAdmin = async userId => {
  try {
    const user = await User.findById(userId);
    if (user.isAdmin !== 1) {
      const error = new Error("You have no permission for do this.");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    throw err
  }
}

// is User active
exports.isUserActive = (active, msg = "Please activate your account.") => {
  if (active !== 1) {
    const error = new Error(msg);
    error.statusCode = 403;
    throw error;
  }
  return true
}
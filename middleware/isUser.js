const Post = require("../models/posts");
const User = require("../models/users");

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

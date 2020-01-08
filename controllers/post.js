const Post = require("../models/posts");
const User = require("../models/users");
const Profile = require("../models/profile");
const { validationResult } = require("express-validator");

/////////////////////////////////////////////////
/////////// Get All Posts
/////////////////////////////////////////////////
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ insertAt: -1 });
    if (!posts) {
      const error = new Error("No post found");
      error.statusCode = 404;
      throw next(error);
    }
    res.status(200).json({
      success: true,
      posts
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Get Single Post
/////////////////////////////////////////////////
exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        const error = new Error("No post found");
        error.statusCode = 404;
        throw next(error);
      }
      res.status(200).json({
        success: true,
        post
      });
    } catch (err) {
      console.log("error", err);
      next(err);
    }
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Add Post
/////////////////////////////////////////////////
exports.addPost = async (req, res, next) => {
  const userId = req.user.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  const { title, description } = req.body;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("Unauthorized access");
      error.statusCode = 401;
      throw next(error);
    }

    const newPost = new Post({
      user: user._id,
      title: title,
      description: description,
      name: user.name,
      avatar: user.avatar
    });

    const post = await newPost.save();
    res.status(201).json({
      success: true,
      message: "Post added successfully",
      post
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Update Post
/////////////////////////////////////////////////
exports.updatePost = async (req, res, next) => {
  try {
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Delete Post
/////////////////////////////////////////////////
exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw next(error);
    }
    if (post.user.toString() !== req.user.userId) {
      const error = new Error("User not authorized");
      error.statusCode = 401;
      throw next(error);
    }
    const result = await post.remove();
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      postId: result._id
    });
  } catch (err) {
    console.log("error", err);
    if (err.kind === "ObjectId") {
      const e = new Error("Post not fuond");
      e.statusCode = 401;
      next(e);
    }
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Add Comment
/////////////////////////////////////////////////
exports.addComment = async (req, res, next) => {
  try {
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Delete Comment
/////////////////////////////////////////////////
exports.deleteComment = async (req, res, next) => {
  try {
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Add Like
/////////////////////////////////////////////////
exports.addLike = async (req, res, next) => {
  try {
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Remove like
/////////////////////////////////////////////////
exports.removeLike = async (req, res, next) => {
  try {
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

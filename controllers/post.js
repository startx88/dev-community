const Post = require("../models/posts");
const User = require("../models/users");
const Profile = require("../models/profile");
const { validationResult } = require("express-validator");
const { resizeImage, deleteFile } = require("../middleware/file");

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
      data: posts.map(post => ({
        _id: post._id,
        title: post.title,
        description: post.description,
        avatar: "http://localhost:4200/" + post.avatar,
        insertAt: post.insertAt,
        likes: post.likes,
        comments: post.comments,
        users: {
          _id: post.user._id,
          name: post.user.name,
          email: post.user.email,
          avatar: post.user.avatar
        }
      }))
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Get user post
/////////////////////////////////////////////////
exports.getUserPosts = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const posts = await Post.find({ user: userId })
      .sort({ insertAt: -1 })
      .populate("user", ["name", "avatar", "email"]);

    if (!posts) {
      const error = new Error("No post found");
      error.statusCode = 404;
      throw next(error);
    }
    res.status(200).json({
      success: true,
      data: posts.map(post => ({
        _id: post._id,
        title: post.title,
        description: post.description,
        avatar: "http://localhost:4200/" + post.avatar,
        insertAt: post.insertAt,
        likes: post.likes,
        comments: post.comments,
        users: {
          _id: post.user._id,
          name: post.user.name,
          email: post.user.email,
          avatar: post.user.avatar
        }
      }))
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
      const post = await Post.findById(postId).populate("user", [
        "name",
        "email",
        "avatar"
      ]);

      if (!post) {
        const error = new Error("No post found");
        error.statusCode = 404;
        throw next(error);
      }

      const user = res.status(200).json({
        success: true,
        data: {
          _id: post._id,
          title: post.title,
          description: post.description,
          avatar: "http://localhost:4200/" + post.avatar,
          insertAt: post.insertAt,
          likes: post.likes,
          comments: post.comments,
          users: {
            _id: post.user._id,
            name: post.user.name,
            email: post.user.email,
            avatar: post.user.avatar
          }
        }
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
  const avatar = req.file;

  // check if image is selected or not
  if (!avatar) {
    const error = new Error("Please select image");
    error.statusCode = 422;
    throw next(error);
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("Unauthorized access");
      error.statusCode = 401;
      deleteFile(avatar.path);
      throw next(error);
    }

    const newPost = new Post({
      user: user._id,
      title: title,
      description: description,
      avatar: avatar.path,
      name: user.name
    });

    const post = await newPost.save();
    if (post) {
      resizeImage(1024, 600, avatar.path);
      res.status(201).json({
        success: true,
        message: "Post added successfully",
        post
      });
    }
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Update Post
/////////////////////////////////////////////////
exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }
  const { title, description } = req.body;
  const avatar = req.file;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("There is no post");
      error.statusCode = 404;
      throw next(error);
    }

    post.title = title;
    post.description = description;
    if (avatar) {
      deleteFile(post.avatar);
      post.avatar = avatar.path;
      resizeImage(1024, 600, avatar.path);
    }
    const result = await post.save();

    res.status(201).json({
      success: true,
      message: "Post added successfully",
      postId: result._id,
      post: {
        ...post._doc,
        avatar: "http://localhost:4200/" + post._doc.avatar
      }
    });
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
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw next(error);
    }

    if (post.user.toString() !== req.user.userId) {
      return res.status(401).json({
        message: "You are not authrized to delete this post"
      });
    }

    const result = await post.remove();

    if (result) {
      deleteFile(post.avatar);
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        postId: result._id
      });
    }
  } catch (err) {
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Add Comment
/////////////////////////////////////////////////
exports.addComment = async (req, res, next) => {
  const userId = req.user.userId;
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("Unauthrozed access");
      error.statusCode = 401;
      throw next(error);
    }
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("No post found!");
      error.statusCode = 404;
      throw next(error);
    }

    const comment = {
      user: userId,
      name: req.body.name,
      email: req.body.email,
      text: req.body.text
    };

    post.comments.unshift(comment);
    const result = await post.save();

    res.status(201).json({
      success: true,
      postId: result._id,
      comments: post.comments
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Delete Comment
/////////////////////////////////////////////////
exports.deleteComment = async (req, res, next) => {
  const userId = req.user.userId;
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("Unauthrozed access");
      error.statusCode = 401;
      throw next(error);
    }
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("No post found!");
      error.statusCode = 404;
      throw next(error);
    }

    const commentIndex = post.comments.findIndex(
      comment => comment._id.toString() === commentId
    );

    const existComment = post.comments[commentIndex];

    if (!existComment) {
      const error = new Error("There is no comment exist!");
      error.statusCode = 404;
      throw next(error);
    }

    if (existComment.user.toString() !== userId) {
      const error = new Error("User not authrized!");
      error.statusCode = 401;
      throw next(error);
    }

    post.comments.splice(commentIndex, 1);
    const result = await post.save();

    res.status(200).json({
      success: true,
      postId: result._id,
      comments: post.comments
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Add Like
/////////////////////////////////////////////////
exports.addLike = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    const userLiked =
      post.likes.filter(like => like.user.toString() === userId).length > 0;

    if (userLiked) {
      const findLike = post.likes.find(like => like.user.toString() === userId); // find the user
      if (findLike.active) {
        return res.status(200).json({
          message: "Post already liked"
        });
      }

      const likeIndex = post.likes.findIndex(
        like => like.user.toString() === userId
      );
      const existingLikes = post.likes[likeIndex];
      post.likes[likeIndex].active = true;
    } else {
      post.likes.unshift({ user: userId, active: true });
    }

    const result = await post.save();
    res.status(200).json({
      success: true,
      message: "Post liked",
      postId: result._id,
      likes: post.likes
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

/////////////////////////////////////////////////
/////////// Remove like
/////////////////////////////////////////////////
exports.removeLike = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user.userId;
  try {
    const post = await Post.findById(postId); // find the post
    const userLiked =
      post.likes.filter(like => like.user.toString() === userId).length > 0;

    if (userLiked) {
      const findLike = post.likes.find(like => like.user.toString() === userId); // find the user
      if (!findLike.active) {
        return res.status(200).json({
          message: "Post already unliked"
        });
      }

      const likeIndex = post.likes.findIndex(
        like => like.user.toString() === userId
      );
      const existingLikes = post.likes[likeIndex];
      post.likes[likeIndex].active = false;
    } else {
      post.likes.unshift({ user: userId, active: false });
    }

    const result = await post.save();
    res.status(200).json({
      success: true,
      message: "Post unliked",
      postId: result._id,
      likes: post.likes
    });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
};

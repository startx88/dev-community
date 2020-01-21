const router = require("express").Router();
const postController = require("../controllers/post");
const { body } = require("express-validator");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const { fileFilter } = require("../middleware/file");

// Upload file
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/posts");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage, filterFile: fileFilter });

// @route       POST api/posts
// @des         get all the posts
// @access      Public
router.get("/", auth, postController.getAllPosts);

// @route       POST api/posts
// @des         get all the posts
// @access      Public
router.get("/user", auth, postController.getLoggedInUserPost);

// @route       POST api/posts/user/:userId
// @des         Get posts by user id
// @access      Public
router.get("/user/:userId", auth, postController.getPostByUserId);

// @route       POST api/posts/:postId
// @des         get single post
// @access      Public
router.get("/:postId", postController.getPost);

// @route       POST api/posts
// @des         Add Post
// @access      Private
router.post(
  "/",
  auth,
  upload.single("avatar"),
  [
    body("title", "Title is required!")
      .not()
      .isEmpty(),
    body("description", "Description is required!")
      .not()
      .isEmpty()
  ],

  postController.addPost
);

// @route       POST api/posts/:postId
// @des         Update Post
// @access      Private
router.put(
  "/:postId",
  auth,
  upload.single("avatar"),
  [
    body("title", "Title is required!")
      .not()
      .isEmpty(),
    body("description", "Description is required!")
      .not()
      .isEmpty()
  ],
  postController.updatePost
);
router.delete("/:postId", auth, postController.deletePost);
router.put("/like/:postId", auth, postController.addLike);
router.put("/dislike/:postId", auth, postController.removeLike);
router.post(
  "/comment/:postId",
  auth,
  [
    body("text", "Text is required")
      .not()
      .isEmpty()
  ],
  postController.addComment
);
router.delete(
  "/comment/:postId/:commentId",
  auth,
  postController.deleteComment
);
// Export Routes
module.exports = router;

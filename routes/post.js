const router = require("express").Router();
const postController = require("../controllers/post");
const { body } = require("express-validator");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const { fileFilter } = require("../middleware/file");

// storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/posts");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage, filterFile: fileFilter });

// Routes
router.get("/", postController.getAllPosts);
router.get("/user", auth, postController.getUserPosts);
router.get("/:postId", postController.getPost);
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
    body("name", "Name is required")
      .not()
      .isEmpty(),
    body("email", "Email is required").isEmail(),
    body("text", "Text is required")
      .not()
      .isEmpty()
  ],
  postController.deleteComment
);
router.delete(
  "/comment/:postId/:commentId",
  auth,
  postController.deleteComment
);
// Export Routes
module.exports = router;

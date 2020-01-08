const router = require("express").Router();
const postController = require("../controllers/post");
const { body } = require("express-validator");
const { auth } = require("../middleware/auth");
// Routes
router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPost);
router.post(
  "/",
  auth,
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
router.delete("/", auth, postController.deletePost);
router.put("/comment", postController.addComment);
router.delete("/comment/:commentId", auth, postController.deleteComment);
router.put("/likes", postController.addLike);
router.delete("/likes/:likeId", auth, postController.removeLike);
// Export Routes
module.exports = router;

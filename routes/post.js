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
router.delete("/:postId", auth, postController.deletePost);
router.put("/like/:postId", auth, postController.addLike);
router.put("/unlink/:likeId", auth, postController.removeLike);
router.post(
  "/comment/:postId",
  auth,
  [
    body("text", "Text is required")
      .not()
      .isEmpty()
  ],
  postController.deleteComment
);
router.delete("/comment/:postId", postController.addComment);
// Export Routes
module.exports = router;

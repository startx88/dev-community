const router = require("express").Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const { auth } = require("../middleware/auth");

// routes
router.get("/", auth, authController.getProfile);
router.post(
  "/",
  [
    body("email", "Email is required").isEmail(),
    body("password", "Password is required")
      .not()
      .isEmpty()
  ],
  authController.getLogin
);
// Export route
module.exports = router;

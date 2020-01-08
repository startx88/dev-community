const router = require("express").Router();
const userController = require("../controllers/users");
const { body } = require("express-validator");
const User = require("../models/users");

// @route       POST api/user
// @des         register user
// @access      public

router.post(
  "/",
  [
    body("name", "Name is required!")
      .not()
      .isEmpty(),
    body("email", "Email is required!")
      .isEmail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          const error = new Error("User already existed");
          error.statusCode = 422;
          throw error;
        }
        return true;
      }),
    body("password", "Password is required!")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 15 })
      .withMessage("Password should be min 6 and max 15 character long.")
      .isAlphanumeric()
      .withMessage("Password should be alpha numeric"),
    body("mobile", "Mobile is required!")
      .not()
      .isEmpty()
  ],
  userController.userSignup
);

// Export
module.exports = router;

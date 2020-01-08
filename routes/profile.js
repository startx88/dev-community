const router = require("express").Router();
const profileController = require("../controllers/profile");
const { body } = require("express-validator");
const { auth } = require("../middleware/auth");

//@route          GET api/profiles
//@desc           Get all profiles
//@access         Public
router.get("/", profileController.getAllProfiles);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
router.get("/user/:userId", profileController.getProfileByUserId);

//@route          GET api/profile/me
//@desc           get current user profile
//@access         private
router.get("/me", auth, profileController.getProfile);

//@route          POST api/profile
//@desc           Add the profile info
//@access         Private
router.post(
  "/",
  auth,
  [
    body("status", "Status is required!")
      .not()
      .isEmpty(),
    body("skills", "Skills is required!")
      .not()
      .isEmpty()
  ],
  profileController.addProfile
);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
router.delete("/", auth, profileController.deleteUser);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
router.post("/active", auth, profileController.activeUser);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
router.post("/deactive", auth, profileController.deactiveUser);

//////////////////////////////////////////////////
/////////////// Experience ///////////////////////
//////////////////////////////////////////////////

//@route          PUT api/profile/experience
//@desc           Update the user experience
//@access         Private
router.post(
  "/experience",
  auth,
  [
    body("title", "Title is required!")
      .not()
      .isEmpty(),
    body("company", "Company is required!")
      .not()
      .isEmpty(),
    body("from", "From date is required!")
      .not()
      .isEmpty(),
    body("current", "Current is required!")
      .not()
      .isEmpty()
  ],
  profileController.addUserExperience
);

router.put(
  "/experience/:expId",
  auth,
  [
    body("title", "Title is required!")
      .not()
      .isEmpty(),
    body("company", "Company is required!")
      .not()
      .isEmpty(),
    body("from", "From date is required!")
      .not()
      .isEmpty(),
    body("current", "Current is required!")
      .not()
      .isEmpty()
  ],
  profileController.updateUserExperience
);

router.delete(
  "/experience/:expId",
  auth,
  [
    body("title", "Title is required!")
      .not()
      .isEmpty(),
    body("company", "Company is required!")
      .not()
      .isEmpty(),
    body("from", "From date is required!")
      .not()
      .isEmpty(),
    body("current", "Current is required!")
      .not()
      .isEmpty()
  ],
  profileController.deleteUserExperience
);
//@route          PUT api/profile/education
//@desc           Update the education
//@access         Private
router.put(
  "/education",
  auth,
  [
    body("school", "Cchool is required!")
      .not()
      .isEmpty(),
    body("degree", "Degree is required!")
      .not()
      .isEmpty(),
    body("fieldofstudy", "Fieldofstudy is required!")
      .not()
      .isEmpty(),
    body("from", "From date is required!")
      .not()
      .isEmpty(),
    body("current", "From date is required!")
      .not()
      .isEmpty()
  ],
  profileController.userEducation
);

module.exports = router;

const router = require("express").Router();
const profileController = require("../controllers/profile");
const { auth } = require("../middleware/auth");

//@route        GET api/profile/me
//des           get current user profile
//access        private
router.get("/me", auth, profileController.getProfile);

// export router
module.exports = router;

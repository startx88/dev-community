const Router = require('express').Router();
const { auth } = require('../middleware/auth')
const adminUserController = require('../controllers/auth');
const adminUserProfileController = require('../controllers/profile');

// Admin Routes
Router.get("/users", auth, adminUserController.getAllUsers);
Router.get("/users/profiles", auth, adminUserProfileController.getAllProfiles);
Router.get("/users/profiles/:userId", auth, adminUserProfileController.getProfileByUserId)
Router.put("/users/deactivate/:userId", auth, adminUserController.userDeactivation);
Router.put("/users/activate/:userId", auth, adminUserController.userActivatation)

module.exports = Router;
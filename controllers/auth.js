const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { isAdmin, isUserActive } = require('../middleware/isUser');

///////////////////////////////
//// Register User
///////////////////////////////
exports.userSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  const { name, email, password, mobile } = req.body;
  try {
    const user = new User({
      name: name,
      email: email,
      password: await User.encryptPassword(password),
      avatar: await User.genAvatar(email),
      mobile: mobile
    });

    const result = await user.save();

    const token = jwt.sign(
      { email: email, userId: result._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfull.",
      token: token,
      userId: result._id,
      expiresIn: 3600
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

///////////////////////////////
//// Loggin user
///////////////////////////////
exports.userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 422;
    throw next(error);
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Email is not found");
      error.statusCode = 401;
      throw next(error);
    }

    const pass = await User.decryptPassword(password, user.password);
    if (!pass) {
      const error = new Error(
        "Credentials are not matched, Please use valid password"
      );
      error.statusCode = 401;
      throw next(error);
    }

    const token = jwt.sign(
      { email: email, userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      message: "User loggedin successfull.",
      token: token,
      userId: user._id,
      expiresIn: 3600
    });
  } catch (error) {
    next(error);
  }
};

///////////////////////////
////// Get logged in user
/////////////////////////
exports.userInfo = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw next(error);
    }

    isUserActive(user.active); // check is user activate

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


///////////////////////////////////
/// Admin Section
/////////////////////////////////////
exports.getAllUsers = async (req, res, next) => {
  const adminId = req.user.userId;
  const query = req.query.active;
  try {
    await isAdmin(adminId);
    const alluser = await User.find().select("-password");
    if (!alluser) {
      return res.status(200).json({
        success: true,
        user
      });
    }
    const user = alluser.filter(user => query ? user.active === Number(query) : user);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

//////////////////////////////////
//////// User Activate/Deactivate 
///////////////////////////////////////
exports.userDeactivation = async (req, res, next) => {
  const adminId = req.user.userId;
  const userId = req.params.userId;
  try {
    await isAdmin(adminId);
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    user.active = 0;
    const result = await user.save();
    res.status(200).json({
      success: true,
      message: "User deactivated successfully!",
      userId: result._id,
      user
    });
  } catch (err) {
    console.log("error", err);
    if (err.kind === "ObjectId") {
      const error = new Error("Profile not found, invalid user id");
      next(error);
    }
    next(err);
  }
}
exports.userActivatation = async (req, res, next) => {
  const adminId = req.user.userId;
  const userId = req.params.userId;
  try {
    await isAdmin(adminId);
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.active = 1;
    const result = await user.save();
    res.status(200).json({
      success: true,
      message: "User activated successfully!",
      userId: result._id,
      user
    });
  } catch (err) {
    console.log("error", err);
    if (err.kind === "ObjectId") {
      const error = new Error("Profile not found, invalid user id");
      next(error);
    }
    next(err);
  }
}

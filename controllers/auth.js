const User = require("../models/users");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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

// user signin
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

///////////////////////////
////// Get logged in user
/////////////////////////
exports.userProfile = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw next(error);
    }

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

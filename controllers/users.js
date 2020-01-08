const User = require("../models/users");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// register user
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
      token: token
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

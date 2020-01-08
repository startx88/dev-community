const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const header = req.get("Authorization");

  if (!header) {
    const error = new Error("Unauthorized access");
    error.statusCode = 401;
    throw next(error);
  }
  const token = header.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (!verify) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw next(error);
    }
    req.user = verify;
    next();
  } catch (error) {
    throw next(error);
  }
};

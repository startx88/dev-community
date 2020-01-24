const express = require("express");
const mongoDB = require("./config/db");
const morgan = require("morgan");
const path = require("path");

/** Database URL */
mongoDB();

/** App */
const app = express();

// development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// constants
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post");
app.use("/api/user", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postRoute);

////////////////////////
/// Error Handling
////////////////////////////////////////////////
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.statusCode = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    errors: {
      status: error.statusCode,
      message: error.message
    }
  });
});

// production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running", PORT);
});

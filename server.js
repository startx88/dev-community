const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// config
dotenv.config();

// database
const DATABASE = `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds229068.mlab.com:29068/${process.env.DATABASE}`;
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(client => {
    console.log("databse connected!");
  })
  .catch(error => {
    console.log("database error", error);
  });

// App
const app = express();

// constants
const PORT = process.env.PORT || 4200;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/upload", express.static("upload"));

// routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});

/**
 * Error handling
 */
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

app.listen(PORT, () => {
  console.log("Server is running...", PORT);
});

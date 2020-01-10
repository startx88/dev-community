const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
// config
dotenv.config();

//////////////////////////
//// Database connection
//////////////////////////
const DATABASE = `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds229068.mlab.com:29068/${process.env.DATABASE}`;
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(client => {
    console.log("databse connected!");
  })
  .catch(error => {
    console.log("database error", error);
  });

/////////////////
////// App
/////////////////////
const app = express();
app.use(cors());
// development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// constants
const PORT = process.env.PORT || 4200;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/upload", express.static("upload"));

// routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post");
app.use("/api/user", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postRoute);
app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});

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

////////////////////////
/// Server listening
////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log("Server is running...", PORT);
});

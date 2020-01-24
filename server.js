const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// config
dotenv.config();

/** Database URL */
const DATABASE = `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds229068.mlab.com:29068/${process.env.DATABASE}`;

/** App */
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
app.use("/uploads", express.static("uploads"));

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

/*******
 * Server, database and socket.io connected
 **********************/
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(client => {
    console.log("database connected");
    const server = app.listen(PORT);
    const io = require("./socket").init(server);
    io.on("connection", socket => {
      console.log("Client connected");
    });
  })
  .catch(error => {
    console.log("database error", error);
  });

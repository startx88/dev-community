const express = require("express");
const mongoDB = require("./config/db");

const path = require("path");
const socket = require("./socket");
/** Database URL */
mongoDB();

/** App */
const app = express();

// constants
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
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
const server = app.listen(PORT, () => {
  console.log("Server is running", PORT);
});

// socket connected
const io = socket.init(server);

/***
 * Established a connection
 *********/
io.on("connection", socket => {
  console.log("user connected!");
  // user chat
  socket.on("chat", data => {
    io.emit("chat", data);
  });

  // user typeing
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", data => {
    console.log("user dis-connected!");
  });
});

const express = require("express");

// App

const app = express();

// constants
const PORT = process.env.PORT || 4200;
app.use(express.static("public"));
app.use("/upload", express.static("upload"));

// routes
app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});

// server
app.listen(PORT, () => {
  console.log("Server is running...", PORT);
});

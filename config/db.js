const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

/*******
 * Server, database and socket.io connected
 **********************/
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MONGODB CONNECTED");
  } catch (err) {
    console.log("database error", err);
    process.exit(1);
  }
};

module.exports = connectDB;

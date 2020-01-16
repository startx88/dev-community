const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const avatar = require("gravatar");

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String },
  avatar: { type: String },
  active: { type: Number, default: 1 },
  isAdmin: { type: Number, default: 0 },
  insertAt: { type: Date, default: Date.now }
});

// Password encryption
UserSchema.statics.encryptPassword = async password => {
  return await bcrypt.hash(password, 12);
};

// Password decryption
UserSchema.statics.decryptPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// get current user
UserSchema.statics.getCurrentUser = async userId => {
  const user = await this.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// get user avatar
UserSchema.statics.genAvatar = async email => {
  return await avatar.url(email, { s: "200", r: "pg", d: "mm" });
};

// export models
module.exports = mongoose.model("User", UserSchema);

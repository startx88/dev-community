const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// post schema
const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  avatar: { type: String },
  active: { type: Number, default: 1 },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      active: { type: Boolean, default: false }
    }
  ],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  insertAt: { type: Date, default: Date.now }
});

// export schema
module.exports = Post = mongoose.model("Post", PostSchema);

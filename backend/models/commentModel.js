const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

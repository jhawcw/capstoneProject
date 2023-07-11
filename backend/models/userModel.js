const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  sex: String,
  address: {
    type: String,
    default: null,
  },
  housingType: {
    type: String,
    default: null,
  },
  singpass: {
    type: Boolean,
    default: false,
  },
  password: String,
  nric: String,
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

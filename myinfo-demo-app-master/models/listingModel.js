const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  price: String,
  address: {
    type: String,
    default: null,
  },
  housingType: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  landlord: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

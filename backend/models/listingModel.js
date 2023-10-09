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
  imageCover: {
    type: String,
    //required: [true, "A listing must have images"],
  },
  images: [String],
  agreement: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    default: null,
  },
  rentalType: {
    type: String,
    default: null,
  },
  comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
  verifiedCount: {
    type: Number,
    default: 0,
  },
  verifiedBy: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  active: {
    type: Boolean,
    default: true,
  },
});

listingSchema.post("findOneAndUpdate", async (doc) => {
  if (doc.verifiedCount === 2) {
    doc.verified = true;
    await doc.save();
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

const mongoose = require("mongoose");

const rentingSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.ObjectId, ref: "Listing" },
    tenant: { type: mongoose.Schema.ObjectId, ref: "User" },
    landLord: { type: mongoose.Schema.ObjectId, ref: "User" },
    tenancyAgreement: {
      type: String,
      default: "",
    },
    startDate: {
      type: Boolean,
      default: false,
    },
    endDate: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "On going",
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

const Renting = mongoose.model("Renting", rentingSchema);

module.exports = Renting;

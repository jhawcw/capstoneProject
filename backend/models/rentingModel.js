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
      type: Date,
      default: new Date(),
    },
    endDate: {
      type: Date,
      default: new Date(),
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

rentingSchema.pre("save", function (next) {
  // Calculate endDate to be 1 year after startDate
  this.endDate = new Date(this.startDate);
  this.endDate.setFullYear(this.endDate.getFullYear() + 1);

  next();
});

rentingSchema.pre(/^find/, function (next) {
  this.populate("tenant").populate("listing").populate("landLord");
  next();
});

const Renting = mongoose.model("Renting", rentingSchema);

module.exports = Renting;

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.ObjectId, ref: "Listing" },
    tenant: { type: mongoose.Schema.ObjectId, ref: "User" },
    tenantAgreement: {
      type: Boolean,
      default: false,
    },
    landLordAgreement: {
      type: Boolean,
      default: false,
    },
    adminApproval: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Pending Tenant's Agreement",
    },
    adminAcknowledged: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;

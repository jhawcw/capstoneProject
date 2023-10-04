const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const applicationModel = require("../models/applicationModel");
const listingModel = require("../models/listingModel");
const AppError = require("../utils/appError");

// Multer configuration to storing of agreements
const multerAgreementStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/agreements");
  },
  filename: (req, file, cb) => {
    cb(null, `user-${req.user.id}-${Date.now()}-${Math.floor(Math.random() * 10000)}.pdf`);
  },
});

const uploadAgreement = multer({
  storage: multerAgreementStorage,
});

exports.uploadAgreement = uploadAgreement.single("agreement");

exports.createApplication = (req, res) => {
  const listingId = req.params.id;
  const userId = req.user;
  const newApplication = new applicationModel({
    listing: listingId,
    tenant: userId,
  });
  newApplication.save();

  res.status(200).json({
    status: "success",
    message: "Application successfully created",
  });
};

exports.myApplications = async (req, res) => {
  const userId = req.user;
  // console.log(req.user);
  // console.log(req.user.role);
  // const role = req.role;

  if (req.user.role === "landlord") {
    try {
      const applications = await applicationModel.aggregate([
        {
          $lookup: {
            from: "listings",
            localField: "listing",
            foreignField: "_id",
            as: "listing",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "tenant",
            foreignField: "_id",
            as: "tenant",
          },
        },
        {
          $unwind: "$listing",
        },
        {
          $unwind: "$listing.landlord",
        },
        {
          $unwind: "$tenant",
        },
        {
          $match: {
            "listing.landlord": new mongoose.Types.ObjectId(userId._id), // Convert the ID to ObjectId
            // "listing.landlord": userId, // Convert the ID to ObjectId
          },
        },
        {
          $group: {
            _id: "$_id", // Group by the original _id field
            tenant: { $first: "$tenant" },
            listing: { $first: "$listing" },
            landlordId: { $first: "$listing.landlord" }, // Include the unwound landlord field
            application: { $first: "$$ROOT" }, // use $push if 1 application is related to multiple other models
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "landlordId",
            foreignField: "_id",
            as: "landlord",
          },
        },
        {
          $unwind: "$landlord",
        },
        {
          $project: {
            _id: 1,
            tenant: 1,
            listing: 1,
            landlord: 1,
            application: 1,
          },
        },
      ]);
      res.status(200).json({
        status: "success",
        message: "You've made it",
        data: applications,
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.user.role === "user") {
    try {
      // const applications = await applicationModel
      //   .find({ tenant: req.user._id })
      //   .populate("listing")
      //   .populate("tenant");

      const applications = await applicationModel.aggregate([
        {
          $lookup: {
            from: "listings",
            localField: "listing",
            foreignField: "_id",
            as: "listing",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "tenant",
            foreignField: "_id",
            as: "tenant",
          },
        },
        {
          $unwind: "$listing",
        },
        {
          $unwind: "$listing.landlord",
        },
        {
          $unwind: "$tenant",
        },
        {
          $match: {
            "tenant._id": new mongoose.Types.ObjectId(userId._id), // Convert the ID to ObjectId
            // "listing.landlord": userId, // Convert the ID to ObjectId
          },
        },
        {
          $group: {
            _id: "$_id", // Group by the original _id field
            tenant: { $first: "$tenant" },
            listing: { $first: "$listing" },
            landlordId: { $first: "$listing.landlord" }, // Include the unwound landlord field
            application: { $first: "$$ROOT" }, // use $push if 1 application is related to multiple other models
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "landlordId",
            foreignField: "_id",
            as: "landlord",
          },
        },
        {
          $unwind: "$landlord",
        },
        {
          $project: {
            _id: 1,
            tenant: 1,
            listing: 1,
            landlord: 1,
            application: 1,
          },
        },
      ]);
      // console.log(applications);

      res.status(200).json({
        status: "success",
        message: "You've made it",
        data: applications,
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.user.role === "admin") {
    try {
      const applications = await applicationModel.aggregate([
        {
          $lookup: {
            from: "listings",
            localField: "listing",
            foreignField: "_id",
            as: "listing",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "tenant",
            foreignField: "_id",
            as: "tenant",
          },
        },
        {
          $unwind: "$listing",
        },
        {
          $unwind: "$listing.landlord",
        },
        {
          $unwind: "$tenant",
        },
        {
          $group: {
            _id: "$_id", // Group by the original _id field
            tenant: { $first: "$tenant" },
            listing: { $first: "$listing" },
            landlordId: { $first: "$listing.landlord" }, // Include the unwound landlord field
            application: { $first: "$$ROOT" }, // use $push if 1 application is related to multiple other models
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "landlordId",
            foreignField: "_id",
            as: "landlord",
          },
        },
        {
          $unwind: "$landlord",
        },
        {
          $project: {
            _id: 1,
            tenant: 1,
            listing: 1,
            landlord: 1,
            application: 1,
          },
        },
      ]);

      res.status(200).json({
        status: "success",
        message: "You've made it",
        data: applications,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

exports.deleteApplication = async (req, res) => {
  const applicationId = req.params.id;
  console.log(applicationId);
  const query = await applicationModel.findByIdAndDelete(applicationId);

  res.status(200).json({
    status: "success",
    message: "The application has been deleted",
    data: query,
  });
};

exports.updateStatusApplication = async (req, res) => {
  const applicationId = req.params.id;
  const role = req.user.role;
  if (role === "user") {
    const query = await applicationModel.findByIdAndUpdate(applicationId, {
      tenantAgreement: true,
      status: "Pending Landlord's Agreement",
    });
  } else if (role === "landlord") {
    const query = await applicationModel.findByIdAndUpdate(applicationId, {
      landLordAgreement: true,
      status: "Pending Admin's Approval",
    });
  } else if (role === "admin") {
    console.log(req.body.decision);
    if (req.body.decision === "approve") {
      const query = await applicationModel.findByIdAndUpdate(applicationId, {
        adminApproval: true,
        adminAcknowledged: true,
        status: "Approved, awaiting deposit",
      });
    } else if (req.body.decision === "reject") {
      const query = await applicationModel.findByIdAndUpdate(applicationId, {
        adminApproval: false,
        adminAcknowledged: true,
        status: "Rejected, apply again",
      });
    }
  }

  res.status(200).json({
    status: "success",
    message: "The application has been updated",
  });
};

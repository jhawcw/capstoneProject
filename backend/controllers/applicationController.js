const mongoose = require("mongoose");
const applicationModel = require("../models/applicationModel");
const listingModel = require("../models/listingModel");
const AppError = require("../utils/appError");

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
          $unwind: "$tenant",
        },
        {
          $match: {
            "listing.landlord": new mongoose.Types.ObjectId(userId._id), // Convert the ID to ObjectId
            // "listing.landlord": userId, // Convert the ID to ObjectId
          },
        },
        {
          $project: {
            _id: 1,
            tenant: 1,
            listing: 1,
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
      const applications = await applicationModel
        .find({ listing: req.user._id })
        .populate("listing");

      res.status(200).json({
        status: "success",
        message: "You've made it",
        data: applications,
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.user.role === "admin") {
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
    const query = await applicationModel.findByIdAndUpdate(applicationId, {
      tenantAgreement: true,
      status: "Approved, awaiting deposit",
    });
  }

  res.status(200).json({
    status: "success",
    message: "The application has been updated",
  });
};

exports.myApplicationAsTenant = async (req, res) => {
  const userId = req.user;
  // console.log(req.user);
  // console.log(req.user.role);
  // const role = req.role;
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
        $unwind: "$tenant",
      },
      {
        $match: {
          "listing.landlord": new mongoose.Types.ObjectId(userId._id), // Convert the ID to ObjectId
          // "listing.landlord": userId, // Convert the ID to ObjectId
        },
      },
      {
        $project: {
          _id: 1,
          tenant: 1,
          listing: 1,
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
};

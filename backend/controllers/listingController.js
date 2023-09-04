const multer = require("multer");
const listingModel = require("../models/listingModel");
const catchAsync = require("../utils/catchAsync");

// Multer configuration to upload user photo into server's filesystem, (NOT DATABASE) start

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/listingVerifications");
  },
  filename: (req, file, cb) => {
    // user-76767676abc76dba-3332222332.jpeg
    // user-userID-timestamp-fileextension
    const extension = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
    //cb(null, `user--${Date.now()}.${extension}`);
  },
});
const multerStorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/listings");
  },
  filename: (req, file, cb) => {
    // user-76767676abc76dba-3332222332.jpeg
    // user-userID-timestamp-fileextension
    const extension = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}-${Math.floor(Math.random() * 10000)}.${extension}`);
    //cb(null, `user--${Date.now()}.${extension}`);
  },
});
// this filter is to prevent user from uploading non image file
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
const upload2 = multer({
  storage: multerStorage2,
  fileFilter: multerFilter,
});
exports.uploadVerificationPhoto = upload.single("photo");
exports.uploadListingPhoto = upload2.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);
// Multer configuration to upload user photo into server's filesystem, (NOT DATABASE) end

exports.createListing = (req, res) => {
  const formData = req.body;
  console.log(req.body);
  console.log(req.files);
  let newListing;
  if (req.files) {
    newListing = new listingModel({
      title: formData.title,
      price: formData.price,
      address: formData.address,
      housingType: formData.housingType,
      landlord: formData.landlord,
      imageCover: req.files.imageCover[0].filename,
      images: [
        req.files.images[0].filename,
        req.files.images[1].filename,
        req.files.images[2].filename,
      ],
    });
  } else {
    newListing = new listingModel({
      title: formData.title,
      price: formData.price,
      address: formData.address,
      housingType: formData.housingType,
      landlord: formData.landlord,
    });
  }

  newListing.save();
  res.status(200).json({
    status: "success",
    message: "Congratulations your listing has been created",
  });
};

exports.getAll = catchAsync(async (req, res) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((ele) => delete queryObj[ele]);

  const query = await listingModel.find(queryObj);
  res.status(200).json({
    data: query,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  let query = await listingModel.findById(req.params.id).populate("landlord");
  res.status(200).json({
    status: "success",
    data: {
      data: query,
    },
  });
});

exports.updateListing = async (req, res) => {
  const formData = req.body;

  if (req.file) {
    const doc = await listingModel.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { verifiedCount: 1 }, $push: { verifiedBy: req.user } },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "You've successfully submitted a photo for verification",
    });
  }
  if (req.body) {
    const query = await listingModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: "success",
      message: "Your listing has been updated successfully",
    });
  } else {
    res.status(404).json({
      status: "Not found",
      message: "Your listing is not found",
    });
  }
};

exports.deleteListing = catchAsync(async (req, res) => {
  const query = await listingModel.findByIdAndDelete(req.params.id);
  console.log(query);
  if (query) {
    return res.status(200).json({
      status: "success",
      message: "The listing has been deleted",
    });
  } else {
    return res.status(404).json({
      status: "Not found",
      message: "The listing does not exist",
    });
  }
});

exports.verifyListing = catchAsync(async (req, res) => {
  const formData = req.body;
});

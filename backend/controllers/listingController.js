const multer = require("multer");
const sharp = require("sharp");
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
const multerStorage3 = multer.memoryStorage();
const upload2 = multer({
  storage: multerStorage3,
  fileFilter: multerFilter,
});

// This function resizes the image to a specific dimension
const resizeImage = async (req, file, cb) => {
  try {
    // Resize the uploaded image to a specific width and height
    await sharp(file.buffer)
      .resize({ width: 800, height: 600 }) // Adjust the dimensions as needed
      .toFile(`public/img/listings/${file.filename}`);

    cb(null, true);
  } catch (error) {
    cb(error);
  }
};

exports.uploadVerificationPhoto = upload.single("photo");
exports.uploadListingPhoto = upload2.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeUploads = (req, res, next) => {
  if (!req.files || (!req.files.imageCover && !req.files.images)) {
    return next();
  }

  const promises = [];
  req.coverPictureName = "jason";
  req.listingPictureName = [];

  if (req.files.imageCover) {
    const imageCover = req.files.imageCover[0];
    promises.push(
      new Promise((resolve, reject) => {
        req.coverPictureName = `listings-${req.user.id}-${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}.jpeg`;
        sharp(imageCover.buffer)
          .resize({ width: 2000, height: 1333 })
          .toFormat("jpeg")
          .jpeg({ quality: 90 }) // Adjust dimensions as needed
          .toFile(`public/img/listings/${req.coverPictureName}`, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
      })
    );
  }

  if (req.files.images) {
    req.files.images.forEach((image) => {
      promises.push(
        new Promise((resolve, reject) => {
          let listingpic = `listings-${req.user.id}-${Date.now()}-${Math.floor(
            Math.random() * 10000
          )}.jpeg`;
          req.listingPictureName.push(listingpic);
          sharp(image.buffer)
            .resize({ width: 2000, height: 1333 })
            .toFormat("jpeg")
            .jpeg({ quality: 90 }) // Adjust dimensions as needed
            .toFile(`public/img/listings/${listingpic}`, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
        })
      );
    });
  }

  Promise.all(promises)
    .then(() => {
      next();
    })
    .catch((err) => {
      next(err);
    });
};

// Middleware for uploading listing photos

// Multer configuration to upload user photo into server's filesystem, (NOT DATABASE) end

exports.createListing = (req, res) => {
  const formData = req.body;

  // console.log(req.coverPictureName);
  // console.log(req.listingPictureName);
  let newListing;

  if (req.files) {
    const images = req.listingPictureName.map((image) => image.filename);

    newListing = new listingModel({
      title: formData.title,
      price: formData.price,
      address: formData.address,
      housingType: formData.housingtype,
      landlord: formData.landlord,
      description: formData.description,
      rentalType: formData.rentaltype,
      imageCover: req.coverPictureName,
      images: images,
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
  console.log("listing successfully created");
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
  console.log("we came here");

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

exports.testUpload = catchAsync(async (req, res) => {
  console.log(req.body);

  res.status(200).json({
    status: "success",
  });
});

const listingModel = require("../models/listingModel");

exports.createListing = (req, res) => {
  const formData = req.body;
  const newListing = new listingModel({
    title: formData.title,
    price: formData.price,
    address: formData.address,
    housingType: formData.housingType,
    landlord: formData.landlord,
  });
  newListing.save();
  res.status(200).json({
    status: "success",
    message: "Congratulations your listing has been created",
  });
};

exports.getAll = async (req, res) => {
  try {
    const query = await listingModel.find();
    res.status(200).json({
      data: query,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getOne = async (req, res, next) => {
  console.log(req.params.id);
  let query = await listingModel.findById(req.params.id).populate("landlord");
  res.status(200).json({
    status: "success",
    data: {
      data: query,
    },
  });
};

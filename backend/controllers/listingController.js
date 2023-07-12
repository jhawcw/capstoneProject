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

exports.updateListing = async (req, res) => {
  try {
    const formData = req.body;
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
  } catch (err) {
    console.log(err);
  }
};

exports.deleteListing = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

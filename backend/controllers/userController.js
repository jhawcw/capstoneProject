const userModel = require("../models/userModel");

exports.landlordRegister = (req, res) => {
  const formData = req.body;
  console.log("this is the formdata:", formData);
  let regadd = formData.regadd.split("\r\n");
  let block = regadd[0].trim();
  let address = regadd[1].trim();
  let postal = regadd[2].trim();
  let fulladdress = block + " " + address + " " + postal;
  const newUser = new userModel({
    fullName: formData.name,
    sex: formData.sex,
    address: fulladdress,
    housingType: formData.housingtype,
    password: formData.password,
    singpass: true,
    nric: formData.uinfin,
    role: "landlord",
  });
  newUser.save();
  res.status(200).json({
    status: "success",
    message:
      "Congratulations your account has been created, please login with your full name and password",
  });
};

exports.tenantRegister = (req, res) => {
  const formData = req.body;
  console.log(req.body);
  const newUser = new userModel({
    fullName: formData.name,
    sex: formData.sex,
    password: formData.password,
  });
  newUser.save();
  res.status(200).json({
    status: "success",
    message:
      "Congratulations your account has been created, please login with your full name and password",
  });
};

exports.getAll = async (req, res) => {
  try {
    const query = await userModel.find();
    res.status(200).json({
      data: query,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const formData = req.body;
    if (req.body) {
      const query = await userModel.findOneAndUpdate(
        { _id: req.params.id },
        { password: req.body.password }
      );
      res.status(200).json({
        status: "success",
        message: "Your password has been updated successfully",
      });
    } else {
      res.status(404).json({
        status: "Not found",
        message: "Please key in your new password",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const query = await userModel.findByIdAndDelete(req.params.id);
    console.log(query);
    if (query) {
      return res.status(200).json({
        status: "success",
        message: "The user has been deleted",
      });
    } else {
      return res.status(404).json({
        status: "Not found",
        message: "The user does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

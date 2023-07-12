const multer = require("multer");
const userModel = require("../models/userModel");

// Multer configuration to upload user photo into server's filesystem, (NOT DATABASE) start

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    // user-76767676abc76dba-3332222332.jpeg
    // user-userID-timestamp-fileextension
    const extension = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
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
exports.uploadUserPhoto = upload.single("photo");
// Multer configuration to upload user photo into server's filesystem, (NOT DATABASE) end

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
  console.log(req.file);
  console.log(req.body);
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

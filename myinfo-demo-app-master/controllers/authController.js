const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const AppError = require("../utils/appError");

exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);

  //jwt header is created automatically
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token: token,
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  const fullName = req.body.fullname;
  const password = req.body.password;

  // 1)check if fullname and password exist
  if (!fullName || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2)check if user exists and password is correct
  const user = await userModel.findOne({ fullName });
  const userPassword = user.password === password ? true : false;

  // 3)if everything is ok , send token to client
  let token = "";
  if (user && userPassword) {
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } else {
    return next(new AppError("Incorrect email or password", 401));
  }

  res.status(200).json({
    status: "success",
    token: token,
  });
};

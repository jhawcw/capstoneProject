const jwt = require("jsonwebtoken");
const { promisify } = require("util");
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
  if (!user) {
    return next(new AppError("User doesnt not exist", 401));
  }
  const userPassword = user.password === password ? true : false;
  // 3)if everything is ok , send token to client
  let token = "";
  if (user && userPassword) {
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } else {
    return next(new AppError("Incorrect name or password", 401));
  }

  res.status(200).json({
    status: "success",
    userID: user.id,
    role: user.role,
    token: token,
  });
};

exports.protect = async (req, res, next) => {
  let token;
  // 1) get the token from the client and check if it is present
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in! Please login to get access", 401));
  }
  // 2) validate the token using the JWT package
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) check if user still exist
  const freshUser = await userModel.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("The user belonging to this token no longer exist", 401));
  }
  // 4) check if user has changed his password after JWT was issued
  // if (freshUser.changePasswordAfter(decoded.iat)) {
  //   return next(new AppError("User has recently changed the password! Please login again", 401));
  // }
  //password changed at will be done in the final version
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
};

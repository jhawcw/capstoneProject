const commentModel = require("../models/commentModel");
const listingModel = require("../models/listingModel");
const catchAsync = require("../utils/catchAsync");

exports.createComment = async (req, res) => {
  const comment = req.body.comment;
  const listingID = req.params.id;
  const userID = req.user.id;
  const newComment = new commentModel({
    text: comment,
    user: userID,
  });
  newComment.save();
  const commentedListing = await listingModel.findById(listingID);
  commentedListing.comments.push(newComment._id);
  commentedListing.save();
  res.status(200).json({
    status: "success",
    message: "Comment successfully added",
  });
};

exports.deleteComment = async (req, res) => {
  const commentID = req.params.id;
  const comment = await commentModel.findByIdAndDelete(commentID);
  res.status(200).json({
    status: "success",
    message: "Comment successfully deleted",
  });
};

exports.updateComment = async (req, res) => {
  const commentID = req.params.id;
  const newComment = req.body.comment;
  const comment = await commentModel.findByIdAndUpdate({ _id: commentID }, { text: newComment });
  res.status(200).json({
    status: "success",
    message: "Comment successfully updated",
  });
};

exports.getRelatedComments = async (req, res) => {
  const listingID = req.params.id;
  const relatedComments = await listingModel.findById(listingID).populate("comments");
  res.status(200).json({
    status: "success",
    data: relatedComments.comments,
  });
};

const userModel = require("../models/userModel");

exports.getAll = (Model) => async (req, res, next) => {
  //allow nested get reviews on tour
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  // EXECUTE QUERY
  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const doc = await features.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
};

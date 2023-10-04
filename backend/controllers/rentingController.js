const Stripe = require("stripe");
const listingModel = require("../models/listingModel");
const catchAsync = require("../utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the current listing that the user wants to rent
  const listing = await listingModel.findById(req.params.listingId);
  const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
  const commission = 0.04 * parseInt(listing.price) * 100;

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    // Authorization: `Bearer ${process.env.STRIPE_PRIVATE_KEY}`,
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:3000/`,
    cancel_url: `${req.protocol}://localhost:3000/`,
    customer_name: req.user.name,
    client_reference_id: req.params.listingId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "sgd",
          unit_amount: parseInt(listing.price) * 100,
          product_data: {
            name: `${listing.address} Tour`,
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      commission: commission,
      deposit: parseInt(listing.price) * 100,
    },
  });

  // 3) Create session as a response
  res.status(200).json({
    status: "success",
    session: session,
  });
});

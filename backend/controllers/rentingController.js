const Stripe = require("stripe");
const listingModel = require("../models/listingModel");
const applicationModel = require("../models/applicationModel");
const rentingModel = require("../models/rentingModel");
const catchAsync = require("../utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the current listing that the user wants to rent
  const listing = await listingModel.findById(req.params.listingId).populate("landlord");
  const landlord = listing.landlord[0]._id;
  const user = req.user._id;
  const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
  const commission = 0.04 * parseInt(listing.price) * 100;

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    // Authorization: `Bearer ${process.env.STRIPE_PRIVATE_KEY}`,
    payment_method_types: ["card"],
    success_url: `${req.protocol}://localhost:3001/rentings/payment-success/?listing=${req.params.listingId}&landlord=${landlord}&tenant=${user}`,
    cancel_url: `${req.protocol}://localhost:3000/`,
    customer_name: req.user.name,
    client_reference_id: req.params.listingId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "sgd",
          unit_amount: parseInt(listing.price) * 100 * 1.069,
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

exports.createRentingPeriod = (req, res, next) => {
  const { listing, landlord, tenant } = req.query;

  // Set the startDate to the current date
  // const startDate = new Date();

  // Set the endDate to 1 year later
  // const endDate = new Date();
  // endDate.setFullYear(endDate.getFullYear() + 1);
  console.log(listing, "this is listing");
  console.log(landlord, "this is landlord");
  console.log(tenant, "this is tenant");

  const renting = new rentingModel({
    listing: listing,
    tenant: tenant,
    landLord: landlord,
    tenancyAgreement: "",
    // startDate: startDate,
    // endDate: endDate,
  });
  renting.save();

  res.status(200).json({
    message: "Congratulation you may collect the keys and occupy the rental room/unit",
    status: "success",
  });
};

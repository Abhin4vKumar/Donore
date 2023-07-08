const Donation = require("../models/donationsModel");
const Request = require("../models/requestModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const userModel = require("../models/userModel");

//Create new Order
exports.newDonation = catchAsyncErrors(async (req, res, next) => {
    const { userEmail, user, requestInfo } = req.body;
    const userId = await userModel.find({email:userEmail});
    if(!userId){
        return next(new ErrorHandler("User Not found with that E-Mail", 404));
    }
    const donation = await Donation.create({
        requestedUserID : req.user._id, user, requestInfo, donatedAt: Date.now(), user: userId,
    });
    res.status(201).json({
        success: true,
        donation
    })
});

// get Single Order
exports.getSingleDonation = catchAsyncErrors(async (req, res, next) => {
    const donation = await Donation.findById(req.params.id).populate("user", "name email");

    if (!donation) {
        return next(new ErrorHandler("Donation not found with this ID", 404));
    }
    res.status(200).json({
        success: true,
        donation
    })
});

// get Logged in user Orders
exports.myDonations = catchAsyncErrors(async (req, res, next) => {
    const donations = await Donation.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        donations
    })
});

// Delete Order

exports.deleteDonation = catchAsyncErrors(async (req, res, next) => {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
        return next(new ErrorHandler("Donation not Found with that Id", 404));
    }
    await donation.remove();

    res.status(200).json({
        success: true,
    })
});
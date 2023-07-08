const Request = require("../models/requestModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");



// Create Product -- Admin
exports.createRequest = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const request = await Request.create(req.body);

    res.status(201).json({
        success: true,
        request
    })
});


// Get All Product
exports.getAllRequests = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 0;
    const productsCount = await Request.countDocuments();
    const apiFeature = new ApiFeatures(Request.find(), req.query).search().filter().pagination(resultPerPage)
    const products = await apiFeature.query;
    res.status(200).json({ success: true, products, productsCount , resultPerPage})
});

//get my products
exports.getMyRequests = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 0;
    const productsCount = await Request.countDocuments();
    const id = req.params.id
    console.log("id" + id);
    const products = await Request.find({user:id});
    res.status(200).json({ success: true, products, productsCount , resultPerPage})
});
//Update Product -- Admin

exports.updateRequest = catchAsyncErrors(async (req, res, next) => {

    let request = await Request.findById(req.params.id);
    if (!request) {
        return next(new ErrorHandler({ message: "Request not Found", statusCode: 404 }))
    }

    request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        request
    })
});


//Delete Product -- Admin

exports.deleteRequest = catchAsyncErrors(async (req, res, next) => {
    const currentUser = JSON.stringify(req.user._id);
    const request = await Request.findById(req.params.id);
    if (!request) {
        return next(new ErrorHandler({ message: "Request not Found", statusCode: 404 }))
    };
    if(currentUser != JSON.stringify(request.user)){
        console.log("123");
        return next(new ErrorHandler({ message: "Request not Found", statusCode: 404 }))
    };
    await request.remove();
    return res.status(200).json({
        success: true,
        message: "Request Deleted"
    })
});


//Get Product details

exports.getRequestDetails = catchAsyncErrors(async (req, res, next) => {
    const request = await Request.findById(req.params.id);
    if (!request) {
        return next(new ErrorHandler({ message: "Request not Found", statusCode: 404 }))
    }

    return res.status(200).json({
        success: true,
        request
    })
});

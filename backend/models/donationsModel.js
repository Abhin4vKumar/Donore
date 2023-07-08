const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    requestedUserID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },
    requestInfo:{
        name: {
            type:String,
            ref:"Request",
            required:true
        },
        description: {
            type: String,
            required: [true, "Please Enter product Description"]
        },
        category: {
            type: String,
            required: [true, "Please Enter Product Category"]
        },
        Quantity: {
            type: Number,
            required: [true, "Please Enter Product Quantity"],
            maxLength: [4, "Stock cannot exceed 4 chars"],
            default: 1
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    donatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = mongoose.model("Donations", donationSchema);
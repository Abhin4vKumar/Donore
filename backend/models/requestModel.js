const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"]
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
    },
    status:{
        type: Boolean,
        default: false
    },
    donatedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: false
    }
})


module.exports = mongoose.model("Request", requestsSchema);
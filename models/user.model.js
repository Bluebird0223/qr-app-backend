const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true

    }
}, { timestamps: true });


const User = mongoose.model("User", userModel);

module.exports = User;

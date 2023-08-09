const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            required: true,
            trim:true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            default: "user",
        },
        status: {
            type: String,
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("users", userSchema);
module.exports = User;

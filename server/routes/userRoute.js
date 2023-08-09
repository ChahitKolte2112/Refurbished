const router = require("express").Router();
const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authMiddle } = require("../middleware/authMiddleware");
router.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error("User already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "created successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const validPassWord = await bcrypt.compare(password, user.password);

        if (!validPassWord) {
            throw new Error("Incorrect password or Email");
        }

        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        });

        res.status(200).send({
            success: true,
            message: "user Login successfully",
            data: token,
        });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
});
router.get("/get-current-user", authMiddle, async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
module.exports = router;

const router = require("express").Router();
const Product = require("../models/productModel");
const { authMiddle } = require("../middleware/authMiddleware");
router.post("/add-product", authMiddle, async (req, res) => {
    try {
        const addseller = { ...req.body, seller: req.body.userId };
        console.log(addseller);
        const newProduct = new Product(addseller);
        await newProduct.save();
        res.status(200).send({
            success: true,
            message: "Product Added succesfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.get("/get-product", async (req, res) => {
    try {
        const product = await Product.find();
        res.send({
            success: true,
            data: product,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
module.exports = router;

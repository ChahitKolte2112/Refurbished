const router = require("express").Router();
const Product = require("../models/productModel");
const { authMiddle } = require("../middleware/authMiddleware");
const { response } = require("express");
router.post("/add-product", authMiddle, async (req, res) => {
    try {
        const addseller = { ...req.body, seller: req.body.userId };
        console.log(addseller);
        const newProduct = new Product(addseller);
        await newProduct.save();
        return res.status(200).json({
            success: true,
            message: "Product Added succesfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
router.get("/get-product", async (req, res) => {
    try {
        const product = await Product.find();
        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
router.put("edit-product/:id", authMiddle, async (req, res) => {
    console.log(req.params.id, "req uest params id");
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const response = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

            return res.status(200).json({
                success: true,
                message: "Changes are Saved",
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});
router.delete("/delete-product/:id", authMiddle, async (req, res) => {
    try {
        
        const result = await Product.findByIdAndDelete(req.params.id);

        return res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;

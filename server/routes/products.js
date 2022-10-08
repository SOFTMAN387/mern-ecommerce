const { authToken } = require("./verifyToken");
const Product = require("../models/Products");
const router = require("express").Router();

//Create Products.................

router.post("/create", authToken, async(req, res) => {
    const newProduct = await Product(req.body);
    try {
        const saveProducts = await newProduct.save();
        res.status(200).json(saveProducts);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Product.By id......................
router.put("/update/:id", authToken, async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get  Product By Id..............................
router.get("/getproduct/:id", async(req, res) => {
    try {
        const getProduct = await Product.findById(req.params.id);
        if (getProduct) {
            res.status(200).json(getProduct);
        } else {
            res.status(203).json(`Product ${req.params.id}Not Found!...
                            `);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete Product.By ID...........................
router.delete("/delete/:id", authToken, async(req, res) => {
    try {
        const ProductDeleted = await Product.findByIdAndDelete(req.params.id);
        if (ProductDeleted) {
            res.status(200).json(` Product ${ req.params.id }deleted... `);
        } else {
            res.status(203).json("something went wrong...");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL ProductS..............................................

router.get("/getproduct", async(req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(2);
            res.status(200).json(products);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },

            });
            res.status(200).json(products);
        } else {
            products = await Product.find();
            res.status(200).json(products);
        }

        // const getAllProducts = await Product.find();
        // res.status(200).json(getAllProducts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
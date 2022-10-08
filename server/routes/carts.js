const { authToken } = require("./verifyToken");
const Cart = require("../models/Carts");
const router = require("express").Router();

//Create Carts.................

router.post("/create", authToken, async(req, res) => {
    const newCart = await Cart(req.body);
    try {
        const saveCarts = await newCart.save();
        res.status(200).json(saveCarts);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Cart.By id......................
router.put("/update/:id", authToken, async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get  Cart By User  Id..............................
router.get("/getCart/:userId", async(req, res) => {
    try {
        const getCart = await Cart.findOne({ userId: req.params.userId });
        if (getCart) {
            res.status(200).json(getCart);
        } else {
            res.status(203).json(`Cart ${req.params.id}Not Found!...
                            `);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete Cart.By ID...........................
router.delete("/delete/:id", authToken, async(req, res) => {
    try {
        const CartDeleted = await Cart.findByIdAndDelete(req.params.id);
        if (CartDeleted) {
            res.status(200).json(` Cart ${ req.params.id }deleted... `);
        } else {
            res.status(203).json("something went wrong...");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL CartS..............................................

router.get("/getCart", async(req, res) => {
    try {
        const getAllCarts = await Cart.find();
        res.status(200).json(getAllCarts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
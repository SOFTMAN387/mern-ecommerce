const { authToken } = require("./verifyToken");
const Order = require("../models/Orders");
const router = require("express").Router();

//Create Orders.................

router.post("/create", async(req, res) => {
    const newOrder = await Order(req.body);
    try {
        const saveOrders = await newOrder.save();
        res.status(200).json(saveOrders);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update Order.By id......................
router.put("/update/:id", authToken, async(req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get  Order By User  Id..............................
router.get("/getOrder/:userId", async(req, res) => {
    try {
        const getOrder = await Order.find({ userId: req.params.userId });
        if (getOrder) {
            res.status(200).json(getOrder);
        } else {
            res.status(203).json(`Order ${req.params.id}Not Found!...
                            `);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//Delete Order.By ID...........................
router.delete("/delete/:id", authToken, async(req, res) => {
    try {
        const OrderDeleted = await Order.findByIdAndDelete(req.params.id);
        if (OrderDeleted) {
            res.status(200).json(` Order ${req.params.id}deleted... `);
        } else {
            res.status(203).json("something went wrong...");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL OrderS..............................................

router.get("/getOrder", async(req, res) => {
    try {
        const getAllOrders = await Order.find();
        res.status(200).json(getAllOrders);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
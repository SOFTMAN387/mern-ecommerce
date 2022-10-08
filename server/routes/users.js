// const { restart } = require("nodemon");
const CryptoJs = require("crypto-js");
const { authToken } = require("./verifyToken");
const User = require("../models/Users");
const router = require("express").Router();


//Update user.By id......................
router.put("/update/:id", authToken, async(req, res) => {
    if (req.body.password) {
        try {
            req.body.password = CryptoJs.AES.encrypt(
                req.body.password,
                process.env.PASS_SECRET_KEY
            ).toString();
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body,
                }, { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
});


//Get  user By Id..............................
router.get("/getuser/:id", authToken, async(req, res) => {
    try {
        const getUser = await User.findById(req.params.id);
        if (getUser) {
            res.status(200).json(getUser);
        } else {
            res.status(203).json(`user ${ req.params.id }
                            Not Found!...
                            `);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


//Delete user.By ID...........................
router.delete("/delete/:id", authToken, async(req, res) => {
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id);
        if (userDeleted) {
            res.status(200).json(`
                            user $ { req.params.id }
                            deleted...
                            `);
        } else {
            res.status(203).json("something went wrong...");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


//GET ALL USERS..............................................

router.get("/getuser", authToken, async(req, res) => {
    try {
        const getAllUsers = await User.find();
        res.status(200).json(getAllUsers);
    } catch (error) {
        res.status(500).json(error);
    }
});






module.exports = router;
const router = require("express").Router();
const User = require("../models/Users");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
//const Cookies = require("js-cookie");

//Registration...................................
router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET_KEY
        ).toString(),
        img: req.body.img,
    });
    try {
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Login....................................

router.post("/login", async(req, res) => {
    try {
        const loginEmail = req.body.email;
        const loginPassword = req.body.password;

        const regEmail = await User.findOne({ email: loginEmail });
        console.log(regEmail);
        // console.log(regEmail[0]._id);
        if (regEmail) {
            // console.log(regEmail);
            const verifyPass = CryptoJs.AES.decrypt(
                regEmail.password,
                process.env.PASS_SECRET_KEY
            );
            const original_pass = verifyPass.toString(CryptoJs.enc.Utf8);
            if (original_pass === loginPassword) {
                // res.status(200).json(regEmail);
                const token = jwt.sign({ id: regEmail._id, isAdmin: regEmail.isAdmin },
                    process.env.TOKEN_SECRET_KEY, { expiresIn: "3d" }
                );

                res.cookie("verifyToken", token, {
                    // maxAge: 5000,
                    // // expires works the same as the maxAge
                    // expires: new Date('01 12 2021'),
                    // secure: true,
                    httpOnly: true,
                });
                // const tkn = req.cookies.verifyToken;
                // console.log("Cookies:--- ", req.cookies);
                // console.log(tkn);
                // console.log(regEmail);
                console.log(" Login Success!..");
                res.status(200).json(regEmail);
            } else {
                res.status(200).json("OOps ! Invalid Credential...");
            }
        } else {
            res.status(200).json("OOps ! Invalid Credential...");
        }
    } catch (error) {
        console.log(error);
        res.status(200).json("User Not Found !!..");
    }
});

module.exports = router;
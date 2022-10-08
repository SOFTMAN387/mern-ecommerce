const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.post("/payment", (req, res) => {
    stripe.charges.create({
            source: req.body.verifyToken,
            amount: req.body.amount,
            currency: "INR",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(500).json(stripeRes);
            }
        })
})


module.exports = router;
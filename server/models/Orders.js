const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
    userToken: {
        type: Array,
    },
    amount: {
        type: Number,
    },
    products: {
        type: Array,
    },
    status: {
        type: String,
        default: "Pending",
    },
}, { timestamps: true });

module.exports = mongoose.model("Ordered", OrdersSchema);
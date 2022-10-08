const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/carts");
const OrdersRouter = require("./routes/orders");
const stripeRouter = require("./routes/stripe");
const cors = require("cors");
dotenv.config();
//app.use(bodyParser.urlencoded({ extended: false }));
const db = process.env.MONGODB_URL;

//Database Connection....
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connection sucessful!!..");
    })
    .catch((error) => {
        console.log("Not connected");
        console.log(error);
    });

app.use(cookieParser());
app.use(cors());
app.use(express.json());
// app.use("/", (req, res) => {
//     // const cookieToken = req.cookies;
//     // res.cookie("user", "lklsd;lskdkdf");
//     console.log(req.cookies);
// })
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/checkout", stripeRouter);
app.get("/api/", (req, res) => {
    console.log("hello from server");
});

app.listen(port, () => {
    console.log(`server is running at ${port}...`);
});
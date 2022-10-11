const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    img: { type: String },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

//export default mongoose.model("User", UsersSchema);
module.exports = mongoose.model("User", UsersSchema);
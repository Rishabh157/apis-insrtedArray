const mongoose = require("mongoose");

const userInfo = new mongoose.Schema({
 name: String,
 password: String,
 email: String,
 date: Date
})

module.exports = mongoose.model("user", userInfo);
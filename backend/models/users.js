//users.js
const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
    userId:Number,
    userName: String,
    userMobileNo: String,
    userMail: String,
    cardNo: String,
    cardBalance: Number
})

const userDetailsModel = mongoose.model("userDetails", userDetailsSchema)
module.exports = userDetailsModel
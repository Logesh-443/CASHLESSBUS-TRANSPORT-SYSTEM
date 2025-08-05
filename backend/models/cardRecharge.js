//cardRecharge.js
const mongoose = require('mongoose')

const CardDetailsSchema = new mongoose.Schema({
    cardRechargeId: Number,
    userId:String,
    cardHolder: String,
    cardNo: String,
    currentBalance: Number,
    rechargeAmount: Number,
    cardBalance:Number
})

const cardDetailsModel = mongoose.model("cardDetails", CardDetailsSchema)
module.exports = cardDetailsModel
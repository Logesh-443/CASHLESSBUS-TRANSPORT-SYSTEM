//busDetail.js
const mongoose = require('mongoose')

const busDetailsSchema = new mongoose.Schema({
    busName: String,
    busNo: String,
    registrationNo: String,
    source: String,
    destination: String,
    busId: Number
})

const busDetailsModel = mongoose.model("busdetails", busDetailsSchema)
module.exports = busDetailsModel

//driverDetail.js
const mongoose = require('mongoose')

const driverDetailsSchema = new mongoose.Schema({
    driverName: String,
    driverMobileNo: String,
    licenseNo: String,
    driverId: Number,
    password:Number
})

const driverDetailsModel = mongoose.model("driverdetails", driverDetailsSchema)
module.exports = driverDetailsModel
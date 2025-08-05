//admindetails
const mongoose = require('mongoose')

const adminDetailsSchema = new mongoose.Schema({
    username: String,
    password: String
})

const adminDetailsModel = mongoose.model("admindetails", adminDetailsSchema)
module.exports = adminDetailsModel

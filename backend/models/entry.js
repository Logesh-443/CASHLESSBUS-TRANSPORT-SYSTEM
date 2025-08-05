//entry.js
const mongoose = require('mongoose')

const EntryDetailsSchema = new mongoose.Schema({
    entryId:Number,
    cardId: String,
    cardHolder:String,
    BusNo:String,
    SRouteId:Number,
    ERouteId:Number,
    EntryTime: Date,
    EntryStopId:Number,
    ExitTime: Date,
    ExitStopId:Number,
    Amount:Number,
    Status: String,
    driverId:String
})

const entryDetailsModel = mongoose.model("entryDetails", EntryDetailsSchema)
module.exports = entryDetailsModel
